# The Select · Wedding Invitations

One master template, and one folder per wedding. Every invitation opens like a card with a gold wax seal. It then shows the couple's names, the date, the venue watercolour, a countdown, the events day by day (with an optional programme), the venue and directions, an optional photo gallery and a WhatsApp RSVP button.

## Folders

| Folder | What it is |
|---|---|
| `_master/` | The blank template. Copy it for every new wedding. |
| `ankit-shiwangi/` | Ankit & Shiwangi, ITC Grand Bharat, 28 Feb – 1 Mar 2027 |

Each wedding folder is self-contained. Changing one wedding never affects another.

## Look

The design follows The Select's watercolour reference: cream paper, gold script names, engraved-style capitals and sage floral corners. Each wedding has two choices:

- **Venue artwork** (`art.venue`): a wide watercolour of that wedding's venue, about 3:1, saved as `images/venue-art.jpg`. This is the centrepiece of the page. Without one, the page still works with florals and typography only.
- **Theme** (`theme.pack`): the page layout is always the same; the theme changes the graphics. Each theme brings its own growing side border, opening-card print, faint background pattern, ornament, petal shower and a matching palette:
  - `lotus` Lotus Garden – pink lotuses and lily pads, rose-petal shower
  - `palace` Royal Palace – marigold and jasmine vine, Mughal jaali print, marigold-petal shower (Rajasthan, Udaipur, palaces)
  - `beach` Beach & Tropical – monstera, palm fronds and frangipani, tropical leaf print, frangipani shower (Goa, Thailand, Vietnam, Bali)
  - `hillside` Hillside Garden – climbing roses and wildflowers, botanical sprig print, blush-petal shower (Kasauli, Mussoorie, Europe)
  - `arabian` Arabian Luxe – white roses on gold and sage eucalyptus, eight-point star lattice, pearl-petal shower (Dubai, Abu Dhabi, RAK)
  Switch a wedding's theme any time: change `theme.pack` and republish; the guest link stays the same.
- **Colour palette** (`theme.palette`): leave `""` to use the theme's own, or pick any of the 21 palettes. While `preview: true` is set, a **Theme & colours** button lets you flip through all themes and palettes live, and replay the opening.
- **Demo of every theme:** https://invite.selectindia.co/demo (add `?theme=palace`, `beach`, `hillside` or `arabian`).

## Making a new wedding

1. Answer the questions below. Claude fills in everything else from that wedding's tracker (events, timings, venue, dates).
2. Claude copies `_master` to a new folder such as `niharika-akshay/` and publishes it.
3. You get the guest link: `https://invite.selectindia.co/niharika-akshay`

**Taken from the wedding tracker automatically:** couple's names, venue, dates, events and start times.

**Round 1 – the look**
1. Theme: Lotus Garden · Royal Palace · Beach & Tropical · Hillside Garden · Arabian Luxe (the colour palette follows the theme unless you choose another of the 21)
2. Opening card: the theme's own print · plain handmade paper · (lotus / sage prints also available)
3. Side decoration: the theme's growing border · sage floral border · none
4. Music: default "Na Tum Jano Na Hum" · couple's own MP3 · none

**Round 2 – the details**
5. Wax seal: couple's seal image · drawn wax seal (colour of choice)
6. Blessing line: Shree Ganeshaya Namah · Ik Onkar · none · other
7. RSVP WhatsApp number (and whose it is)
8. RSVP deadline

**Round 3 – the extras**
9. Venue artwork (watercolour of the venue) or none
10. Event illustrations: matched to the theme · original colours
11. Which event the wardrobe models are dressed for
12. Wardrobe colour palettes per event (or set them in the preview)

## Before sharing with guests

- Set `preview: false` so the Style button disappears.
- Add the RSVP number.

## Changes after the link is sent

Ask Claude for the change (timings, a new event, colours, photos, the RSVP number). The same link updates, and guests see the new version the next time they open it.

## Personal links

Add `?to=` and the guest's name to the link, for example `…/ankit-shiwangi?to=Sharma%20Family`. The invite then opens with "Dear Sharma Family," and the WhatsApp message is filled in with their name.
