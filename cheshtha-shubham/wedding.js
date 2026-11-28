/* =====================================================================
   THE SELECT · WEDDING INVITATION — CONTENT FILE
   Cheshtha & Shubham · Hyatt Regency Chandigarh · 28 Feb – 1 Mar 2027
   ---------------------------------------------------------------------
   This is the ONLY file that changes per wedding.
   • Keep the quotes "..." and the commas at line ends.
   • Leave a value "" (or a list []) to hide it.
   ===================================================================== */

window.WEDDING = {

  /* ---------- Look & feel ----------
     palette: "lotus" | "champagne" | "select" | "royal" | "rose" | "ocean" |
              "navyBlush" | "sageChampagne" | "dustyBlue" | "burgundyGold" | "terracotta" | "emerald" | "lavenderSage" | "mocha" |
              "butterBlue" | "blackWhite" | "peachCoral" | "mauveTaupe" | "forestRust" | "cherryBlush" | "champagnePearl"
     art.venue: a watercolour of the venue (wide image, about 3:1) in the images folder
     art.florals: true shows the sage floral corners and side borders
     Each event gets a small drawn emblem chosen from its name (mandap, mehndi hand, haldi bowl, rings, dhol, cocktail, diya, dinner).
     To choose one yourself, add icon: "mandap" | "mehndi" | "haldi" | "rings" | "dhol" | "cocktail" | "diya" | "dinner" | "lotus" to the event.                                   */
  theme: { pack: "lotus", palette: "", wax: "", sealImage: "images/seal.png", iconColor: "theme", artColor: "theme" },   // pack: the design theme — "lotus" | "palace" | "beach" | "hillside" | "arabian" (sets the graphics, patterns, petals and a matching palette) · palette: leave "" to use the theme's own · sealImage: the gold seal with the couple's initials — always "images/seal.png", made with tools/make_seal.py (the seal design never changes, only the initials) · iconColor: event emblem colour — "ink", "theme", "gold", "sage", "rose" or a colour code
  art: { venue: "", florals: true, decor: "", events: true, doorPrint: "" },   // doorPrint: leave "" for the theme's own print, or "lotus" | "plain" | "sage" | "palace" | "beach" | "hillside" | "arabian" · decor: leave "" for the theme's growing border, or "sage" (florals: false = none) · pattern: false hides the faint background pattern

  /* true = shows the colour switcher (for The Select only). Set false before sharing with guests. */
  preview: false,

  /* ---------- The couple ---------- */
  couple: {
    first: "Cheshtha",
    second: "Shubham",
    monogram: "CS",
    hashtag: ""
  },

  blessing: "|| Shree Ganeshaya Namah ||",

  /* ---------- Dates ---------- */
  dates: {
    display: "February 28 & March 1, 2027",
    reveal: ["Monday", "1st March", "2027"],     // shown on the scratch card
    countdownTo: "2027-03-01T17:00:00+05:30"
  },

  /* ---------- Text ---------- */
  text: {
    request: "Request the pleasure of your company as they celebrate their wedding",
    welcomeBody: "In the City Beautiful, we begin our forever — with mehndi in the sunshine, a night of music and dance, and vows around the sacred fire. Your blessings and your presence would make it complete.",
    revealTitle: "Save the date",
    revealHint: "Scratch the card to reveal",
    countdownTitle: "Countdown to our wedding",
    eventsTitle: "Wedding events",
    wardrobeTitle: "Wardrobe planner",
    wardrobeIntro: "A little colour guide for each celebration — dress up, have fun, and match the mood.",
    rsvpTitle: "Kindly RSVP"
  },

  /* ---------- Families (empty lists hide the section) ---------- */
  families: {
    title: "With love from our families",
    sides: [
      { heading: "The bride's family", lines: [] },
      { heading: "The groom's family", lines: [] }
    ]
  },

  /* ---------- Events (from the wedding tracker's Event Flow) ---------- */
  days: [
    {
      label: "Day 1",
      date: "28th February, 2027",
      events: [
        {
          name: "Mehndi Lunch", time: "12 PM onwards", venue: "Hyatt Regency Chandigarh", dress: "", colour: "",
          note: "",
          moments: [],
          image: "", start: "2027-02-28T12:00:00+05:30", end: "2027-02-28T15:30:00+05:30"
        },
        {
          name: "Engagement & Sangeet", time: "7 PM onwards", venue: "The Palm", map: "", address: "", dress: "", colour: "",
          note: "",
          moments: [],
          image: "", start: "2027-02-28T19:00:00+05:30", end: "2027-03-01T01:00:00+05:30"
        }
      ]
    },
    {
      label: "Day 2",
      date: "1st March, 2027",
      events: [
        {
          name: "Haldi Brunch", time: "11 AM onwards", venue: "Hyatt Regency Chandigarh", dress: "", colour: "",
          note: "",
          moments: [],
          image: "", start: "2027-03-01T11:00:00+05:30", end: "2027-03-01T14:45:00+05:30"
        },
        {
          name: "Wedding Ceremony", time: "5 PM onwards", venue: "Farmhouse", map: "", address: "", dress: "", colour: "",
          note: "",
          moments: [],
          image: "", start: "2027-03-01T17:00:00+05:30", end: "2027-03-02T01:00:00+05:30"
        }
      ]
    }
  ],

  /* ---------- Wardrobe planner ----------
     palette: 2–4 colours per event, by name (Ivory, Champagne, Gold, Silver, Blush, Rose, Rani Pink, Peach, Coral,
     Marigold, Turmeric, Lemon, Mint, Pistachio, Emerald, Bottle Green, Powder Blue, Royal Blue, Navy, Lilac, Purple,
     Wine, Maroon, Red, Black) or any colour code like "#C2185B".
     feature: true = the illustrated models wear this event's palette (colour 1 lehenga, 2 gown, 3 sherwani, 4 blazer & turban).
     Every other event shows its palette as colour swatches.                                                   */
  wardrobe: [
    { event: "Mehndi Lunch", when: "28th February", theme: "Shades of orange and red", note: "Warm reds, rust and marigold.",
      palette: ["Red", "Marigold", "Coral", "Maroon"], image: "images/wardrobe-mehndi.png" },
    { event: "Engagement & Sangeet", when: "28th February", theme: "Shimmer all the way", note: "Sequins, shine and midnight tones.",
      palette: ["Black", "Navy", "Emerald", "Gold"], image: "images/wardrobe-sangeet.png" },
    { event: "Haldi Brunch", when: "1st March", theme: "Pastels", note: "Soft pastels: powder blue, blush, lemon, mint and lilac.",
      palette: ["Powder Blue", "Blush", "Lemon", "Mint", "Lilac"], image: "images/wardrobe-haldi.png" },
    { event: "Wedding Ceremony", when: "1st March", theme: "Wine, blush & emerald", note: "Rich wine and soft blush with a touch of deep green.",
      palette: ["Maroon", "Blush", "Bottle Green", "Ivory"], image: "images/wardrobe-wedding.jpg", feature: true }
  ],

  /* ---------- Venue ----------
     photos: add 2–4 venue photos to the images folder, e.g. ["images/venue-1.jpg", "images/venue-2.jpg"]
     With no photos, a drawing of the setting is shown instead.                */
  venue: {
    name: "Hyatt Regency Chandigarh",
    city: "Chandigarh",
    address: "178 Industrial & Business Park, Phase 1, Chandigarh 160002 (adjoining Elante Mall)",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Hyatt+Regency+Chandigarh",
    photos: [],
    notes: [
      "In the heart of the tri-city, right next to Elante Mall.",
      "Nearest airport: Chandigarh International (IXC), about 20 minutes by road · Chandigarh railway station is about 3 km away.",
      "Guests stay from 28 February to 2 March 2027."
    ]
  },

  /* ---------- RSVP on WhatsApp ----------
     number: country code + number, no + or spaces, e.g. "919876543210"           */
  rsvp: {
    number: "919888278120",
    name: "the RSVP team",
    deadline: "31 January 2027",
    intro: "Please confirm your presence on WhatsApp by 31 January 2027, so we can plan your stay with care.",
    message: "Hello! This is {name}. We'd love to confirm our presence for Cheshtha & Shubham's wedding (28 Feb – 1 Mar 2027). Number of guests: "
  },

  /* ---------- Optional extra contacts (WhatsApp) ---------- */
  contacts: [],

  music: "default",   // "default" = Na Tum Jano Na Hum · or your own MP3, e.g. "images/our-song.mp3" · or "none" for no music

  show: {
    welcome: true, reveal: true, families: true, countdown: true,
    events: true, wardrobe: true, venue: true, gallery: true, rsvp: true, contacts: true
  }
};
