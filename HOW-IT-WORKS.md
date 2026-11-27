# The Select · Wedding Invitations

One master template, and one folder per wedding. Every invitation opens like a card with a gold wax seal. It then shows the couple's names, the date, the venue watercolour, a countdown, the events day by day (with an optional programme), the venue and directions, an optional photo gallery and a WhatsApp RSVP button.

## Folders

| Folder | What it is |
|---|---|
| `_master/` | The blank template. Copy it for every new wedding. |
| `ankit-shivangi/` | Ankit & Shivangi, ITC Grand Bharat, 28 Feb – 1 Mar 2027 |

Each wedding folder is self-contained. Changing one wedding never affects another.

## Look

The design follows The Select's watercolour reference: cream paper, gold script names, engraved-style capitals and sage floral corners. Each wedding has two choices:

- **Venue artwork** (`art.venue`): a wide watercolour of that wedding's venue, about 3:1, saved as `images/venue-art.jpg`. This is the centrepiece of the page. Without one, the page still works with florals and typography only.
- **Colour palette** (`theme.palette`): `champagne` Champagne & Sage (default) · `select` Sage & Copper · `royal` Royal Maroon & Gold · `emerald` Emerald & Gold · `rose` Rose & Blush · `ocean` Ocean & Sand. While `preview: true` is set, a **Colours** button lets you try them all live.

## Making a new wedding

1. Answer the questions below. Claude fills in everything else from that wedding's tracker (events, timings, venue, dates).
2. Claude copies `_master` to a new folder such as `niharika-akshay/` and publishes it.
3. You get the guest link: `https://invite.selectindia.co/niharika-akshay`

**Questions per wedding:**
1. Palette (or "you choose"), plus the venue watercolour artwork
2. WhatsApp number for RSVPs, and whose name it is
3. Blessing line (Shree Ganeshaya Namah / Ik Onkar / none / other)
4. RSVP deadline
5. Families' names, if they should appear
6. Optional: venue photos for the Gallery, and dress codes

## Before sharing with guests

- Set `preview: false` so the Style button disappears.
- Add the RSVP number.

## Changes after the link is sent

Ask Claude for the change (timings, a new event, colours, photos, the RSVP number). The same link updates, and guests see the new version the next time they open it.

## Personal links

Add `?to=` and the guest's name to the link, for example `…/ankit-shivangi?to=Sharma%20Family`. The invite then opens with "Dear Sharma Family," and the WhatsApp message is filled in with their name.
