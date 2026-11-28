"""The Select gold wax seal with any two initials.
Takes the master gold seal (tools/seal-master.png), clears the centre and embosses new initials
in the same gold.  Usage: python3 tools/make_seal.py CS couple-slug/images/seal.png  (needs numpy, opencv-python, pillow)
The seal design never changes: only the initials do."""
import sys, numpy as np, cv2
from PIL import Image, ImageDraw, ImageFont

import os
HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'seal-master.png')
FONT = os.path.join(HERE, 'Cormorant.ttf')
CX, CY = 322, 331          # centre of the inner disc
R_CLEAR = 178              # radius that holds the letters

def clear_centre(rgba):
    rgb = rgba[..., :3].astype(np.float32)
    H, W = rgb.shape[:2]
    yy, xx = np.mgrid[:H, :W]
    rr = np.hypot(xx - CX, yy - CY)
    disc = rr < R_CLEAR
    # smooth background estimate of the plain disc, then the letters are what differs from it
    med = cv2.medianBlur(rgba[..., :3].copy(), 41).astype(np.float32)
    diff = np.abs(rgb - med).sum(-1)
    lum = rgb.mean(-1)
    mask = ((diff > 38) | (lum > med.mean(-1) + 22) | (lum < med.mean(-1) - 26)) & disc
    mask = cv2.dilate(mask.astype(np.uint8), np.ones((9, 9), np.uint8))
    # rebuild the plain disc: smooth lighting fitted on the clean metal, plus its fine grain
    clean = disc & (mask == 0)
    X = (xx - CX) / 200.0; Y = (yy - CY) / 200.0
    A = np.stack([np.ones_like(X), X, Y], -1)
    sm = np.zeros_like(rgb)
    for ch in range(3):
        coef, *_ = np.linalg.lstsq(A[clean], rgb[..., ch][clean], rcond=None)
        sm[..., ch] = A @ coef
    grain_src = rgb - cv2.GaussianBlur(rgb, (0, 0), 3)
    gs = grain_src[clean].std(0)
    rng = np.random.default_rng(3)
    noise = cv2.GaussianBlur(rng.normal(0, 1, (H, W)).astype(np.float32), (0, 0), .7)[..., None] * gs * 1.9
    mott = cv2.GaussianBlur(rng.normal(0, 1, (H, W)).astype(np.float32), (0, 0), 14)[..., None] * 7
    soft = np.clip((R_CLEAR - 4 - rr) / 12, 0, 1)[..., None]
    out = rgb * (1 - soft) + (sm + noise + mott) * soft
    return out, disc

def letters_mask(text, size):
    H = W = 640
    m = Image.new('L', (W * 2, H * 2), 0); d = ImageDraw.Draw(m)
    f = ImageFont.truetype(FONT, size * 2); f.set_variation_by_axes([560])
    a, b = text[0], text[1]
    # first letter upper-left, second letter overlapping lower-right (like the AS monogram)
    d.text(((CX - 58) * 2, (CY + 58) * 2), a, font=f, fill=255, anchor='ms')
    d.text(((CX + 58) * 2, (CY + 104) * 2), b, font=f, fill=255, anchor='ms')
    return np.asarray(m.resize((W, H), Image.LANCZOS), np.float32) / 255

def emboss(base, mask, disc):
    # height: rounded bevel from the distance to the letter edge
    bm = (mask > .5).astype(np.uint8)
    dist = cv2.distanceTransform(bm, cv2.DIST_L2, 5)
    h = np.clip(dist / 3.6, 0, 1) ** .7 * mask
    h = cv2.GaussianBlur(h, (0, 0), .9)
    gy, gx = np.gradient(h * 6)
    n = np.dstack([-gx, -gy, np.ones_like(h)]); n /= np.linalg.norm(n, axis=-1, keepdims=True)
    L = np.array([-.55, -.65, .52]); L /= np.linalg.norm(L)
    diff = np.clip((n * L).sum(-1), 0, 1)
    V = np.array([0, 0, 1.0]); Hv = (L + V) / np.linalg.norm(L + V)
    spec = np.clip((n * Hv).sum(-1), 0, 1) ** 28
    # letter face gold sampled from the disc, a touch brighter and smoother
    face = cv2.GaussianBlur(base, (0, 0), 6) * 1.2
    lit = face * (.55 + .75 * diff)[..., None] + np.array([255, 238, 190]) * (spec * .9)[..., None]
    # soft shadow cast to the lower right
    sh = cv2.GaussianBlur(np.roll(np.roll(mask, 5, 0), 4, 1), (0, 0), 4) * (1 - mask) * .62
    out = base * (1 - sh[..., None])
    out = out * (1 - mask[..., None]) + lit * mask[..., None]
    return out

if __name__ == '__main__':
    text, outp = sys.argv[1].upper()[:2], sys.argv[2]
    src = np.asarray(Image.open(SRC).convert('RGBA'))
    base, disc = clear_centre(src)
    mask = letters_mask(text, 292)
    out = emboss(base, mask, disc)
    rgba = np.dstack([np.clip(out, 0, 255).astype(np.uint8), src[..., 3]])
    Image.fromarray(rgba, 'RGBA').save(outp)
    v = Image.new('RGB', (640, 640), (255, 255, 255)); im = Image.fromarray(rgba, 'RGBA'); v.paste(im, (0, 0), im); v.save('/tmp/seal_' + text + '.png')
    print('ok', outp)
