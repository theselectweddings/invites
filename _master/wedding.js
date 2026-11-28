/* =====================================================================
   THE SELECT · WEDDING INVITATION — MASTER CONTENT FILE
   ---------------------------------------------------------------------
   Copy the _master folder for each new wedding and fill in this file.
   The sample couple (Aanya & Kabir) is fictional — replace everything.
   • Keep the quotes "..." and the commas at line ends.
   • Leave a value "" (or a list []) to hide it.
   ===================================================================== */

window.WEDDING = {

  /* ---------- Look & feel ----------
     palette: "lotus" | "champagne" | "select" | "royal" | "rose" | "ocean" |
              "navyBlush" | "sageChampagne" | "dustyBlue" | "burgundyGold" | "terracotta" | "emerald" | "lavenderSage" | "mocha" |
              "butterBlue" | "blackWhite" | "peachCoral" | "mauveTaupe" | "forestRust" | "cherryBlush" | "champagnePearl"
     art.venue: a watercolour of the venue (wide image, about 3:1) in the images folder, e.g. "images/venue-art.jpg"
     art.florals: true shows the sage floral corners and side borders
     Each event gets a small drawn emblem chosen from its name (mandap, mehndi hand, haldi bowl, rings, dhol, cocktail, diya, dinner).
     To choose one yourself, add icon: "mandap" | "mehndi" | "haldi" | "rings" | "dhol" | "cocktail" | "diya" | "dinner" | "lotus" to the event.                                   */
  theme: { pack: "lotus", palette: "", wax: "", sealImage: "", iconColor: "theme", artColor: "theme" },   // pack: the design theme — "lotus" | "palace" | "beach" | "hillside" | "arabian" (sets the graphics, patterns, petals and a matching palette) · palette: leave "" to use the theme's own · sealImage: the couple's wax-seal picture, e.g. "images/seal.png" · leave "" for a drawn seal in the wax colour · iconColor: event emblem colour — "ink", "theme", "gold", "sage", "rose" or a colour code
  art: { venue: "", florals: true, decor: "", events: true, doorPrint: "" },   // doorPrint: leave "" for the theme's own print, or "lotus" | "plain" | "sage" | "palace" | "beach" | "hillside" | "arabian" · decor: leave "" for the theme's growing border, or "sage" (florals: false = none) · pattern: false hides the faint background pattern

  /* true = shows the colour switcher (for The Select only). Set false before sharing with guests. */
  preview: true,

  /* ---------- The couple ---------- */
  couple: { first: "Aanya", second: "Kabir", monogram: "AK", hashtag: "" },

  blessing: "|| Shree Ganeshaya Namah ||",   // e.g. "Ik Onkar", "Bismillah", or ""

  /* ---------- Dates ----------
     countdownTo time zones: +05:30 India · +04:00 Dubai · +07:00 Thailand/Vietnam · +08:00 Malaysia/Bali · +01:00 Europe (winter) · +02:00 Europe (summer) */
  dates: {
    display: "February 14 & 15, 2027",
    reveal: ["Monday", "15th February", "2027"],   // shown on the scratch card
    countdownTo: "2027-02-15T19:00:00+05:30"
  },

  text: {
    request: "Request the pleasure of your company as they celebrate their wedding",
    welcomeBody: "With the blessings of our elders, we are beginning our journey together — and it would mean the world to celebrate it with you.",
    revealTitle: "Save the date",
    revealHint: "Scratch the card to reveal",
    countdownTitle: "Countdown to our wedding",
    eventsTitle: "Wedding events",
    wardrobeTitle: "Wardrobe planner",
    wardrobeIntro: "A little colour guide for each celebration — dress up, have fun, and match the mood.",
    rsvpTitle: "Kindly RSVP"
  },

  families: {
    title: "With love from our families",
    sides: [
      { heading: "The bride's family", lines: [] },   // e.g. ["Mrs. Meera & Mr. Rohan Kapoor"]
      { heading: "The groom's family", lines: [] }
    ]
  },

  /* ---------- Events, one column per day ----------
     date: "14th February, 2027" (st/nd/rd/th become small superscripts)
     moments: optional ["time", "what happens"] list shown under "View programme"
     venue / map / address: for an event at another venue, venue: "The Palm", map: "<Google Maps link>" (shows a 📍 Get directions button), address: "…" (used in the calendar invite)
     art: optional illustration — "mehndi" | "sangeet" | "haldi" | "pheras" | "anandkaraj" | "afterparty" | "none" (otherwise chosen from the event name)
     dress: optional dress code · start/end: for the "Add to calendar" link          */
  days: [
    {
      date: "14th February, 2027",
      events: [
        { name: "Mehndi", time: "4 PM onwards", venue: "", dress: "", note: "", moments: [],
          start: "2027-02-14T16:00:00+05:30", end: "2027-02-14T19:00:00+05:30" },
        { name: "Sangeet", time: "8 PM onwards", venue: "", dress: "", note: "", moments: [],
          start: "2027-02-14T20:00:00+05:30", end: "2027-02-15T01:00:00+05:30" }
      ]
    },
    {
      date: "15th February, 2027",
      events: [
        { name: "Wedding Ceremony", time: "5 PM onwards", venue: "", dress: "", note: "",
          moments: [["5:00 PM", "Baraat"], ["7:00 PM", "Varmala"], ["8:00 PM", "Pheras"], ["10:00 PM", "Dinner"]],
          start: "2027-02-15T17:00:00+05:30", end: "2027-02-16T00:30:00+05:30" }
      ]
    }
  ],

  /* ---------- Wardrobe planner ----------
     palette: 2–4 colours per event, by name (Ivory, Champagne, Gold, Silver, Blush, Rose, Rani Pink, Peach, Coral,
     Marigold, Turmeric, Lemon, Mint, Pistachio, Emerald, Bottle Green, Powder Blue, Royal Blue, Navy, Lilac, Purple,
     Wine, Maroon, Red, Black) or any colour code like "#C2185B".
     feature: true = the illustrated models wear this event's palette (colour 1 lehenga, 2 gown, 3 sherwani, 4 blazer & turban).
     image: "images/wardrobe-wedding.jpg" = use a finished illustration for this event as it is (no recolouring).
     Every other event shows its palette as colour swatches.                                                   */
  wardrobe: [
    { event: "Mehndi Lunch", when: "14th February", theme: "Garden greens", note: "Fresh greens with a pop of pink.",
      palette: ["Pistachio", "Mint", "Emerald", "Rani Pink"] },
    { event: "Engagement & Sangeet", when: "14th February", theme: "Shimmer all the way", note: "Sequins, shine and midnight tones.",
      palette: ["Black", "Navy", "Emerald", "Silver"] },
    { event: "Haldi Brunch", when: "15th February", theme: "Sunshine yellows", note: "Turmeric, marigold and soft peach.",
      palette: ["Turmeric", "Peach", "Ivory", "Marigold"] },
    { event: "Wedding Ceremony", when: "15th February", theme: "Royal jewel tones", note: "Rich jewel tones with gold.",
      palette: ["Maroon", "Royal Blue", "Emerald", "Purple"], feature: true }
  ],

  /* ---------- Venue ----------
     photos: optional venue photos for the Gallery, e.g. ["images/venue-1.jpg", "images/venue-2.jpg"] */
  venue: {
    name: "Venue name",
    city: "City, State",
    address: "",
    mapLink: "",
    photos: [],
    notes: []
  },

  /* ---------- RSVP on WhatsApp ----------
     number: country code + number, no + or spaces, e.g. "919876543210"
     message: what opens in the guest's WhatsApp; {name} = guest name from a personal link */
  rsvp: {
    number: "",
    name: "the RSVP team",
    deadline: "",
    intro: "Please confirm your presence on WhatsApp, so we can plan your stay with care.",
    message: "Hello! This is {name}. We'd love to confirm our presence for Aanya & Kabir's wedding. Number of guests: "
  },

  contacts: [],   // e.g. [{ name: "Shikha Sharma", role: "Event adviser · The Select", whatsapp: "91XXXXXXXXXX" }]
  music: "default",   // "default" = Na Tum Jano Na Hum · or your own MP3, e.g. "images/our-song.mp3" · or "none" for no music

  show: { welcome: true, reveal: true, families: true, countdown: true, events: true, wardrobe: true, venue: true, gallery: true, rsvp: true, contacts: true }
};
