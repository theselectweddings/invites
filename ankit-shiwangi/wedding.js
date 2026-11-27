/* =====================================================================
   THE SELECT · WEDDING INVITATION — CONTENT FILE
   Ankit & Shiwangi · ITC Grand Bharat · 28 Feb – 1 Mar 2027
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
  theme: { palette: "lotus", wax: "#9E2F4E", sealImage: "images/seal.png", iconColor: "theme", artColor: "theme" },   // sealImage: the couple's own wax-seal picture (or "" for a drawn seal) · artColor: event illustrations "theme" (tinted to the palette) or "original" · iconColor: line-emblem colour — "ink", "theme", "gold", "sage", "rose" or any colour code like "#B08A3E"
  art: { venue: "images/venue-art.jpg", florals: true, decor: "lotus", events: true, doorPrint: "plain" },   // doorPrint: opening card "lotus" | "plain" | "sage" · decor: side border "lotus" | "sage" (florals: false = none)

  /* true = shows the colour switcher (for The Select only). Set false before sharing with guests. */
  preview: false,

  /* ---------- The couple ---------- */
  couple: {
    first: "Ankit",
    second: "Shiwangi",
    monogram: "AS",
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
    welcomeBody: "Amidst the Aravalli hills, we begin our forever — with mehndi in the sunshine, a night of music and dance, and vows around the sacred fire. Your blessings and your presence would make it complete.",
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
          name: "Mehndi Lunch", time: "12 PM onwards", venue: "ITC Grand Bharat", dress: "", colour: "",
          note: "",
          moments: [],
          image: "", start: "2027-02-28T12:00:00+05:30", end: "2027-02-28T15:30:00+05:30"
        },
        {
          name: "Engagement & Sangeet", time: "7 PM onwards", venue: "ITC Grand Bharat", dress: "", colour: "",
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
          name: "Haldi Brunch", time: "11 AM onwards", venue: "ITC Grand Bharat", dress: "", colour: "",
          note: "",
          moments: [],
          image: "", start: "2027-03-01T11:00:00+05:30", end: "2027-03-01T14:45:00+05:30"
        },
        {
          name: "Wedding Ceremony", time: "5 PM onwards", venue: "ITC Grand Bharat", dress: "", colour: "",
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
    { event: "Mehndi Lunch", when: "28th February", theme: "Garden greens", note: "Fresh greens with a pop of pink.",
      palette: ["Pistachio", "Mint", "Emerald", "Rani Pink"] },
    { event: "Engagement & Sangeet", when: "28th February", theme: "Shimmer all the way", note: "Sequins, shine and midnight tones.",
      palette: ["Black", "Navy", "Emerald", "Silver"] },
    { event: "Haldi Brunch", when: "1st March", theme: "Sunshine yellows", note: "Turmeric, marigold and soft peach.",
      palette: ["Turmeric", "Peach", "Ivory", "Marigold"] },
    { event: "Wedding Ceremony", when: "1st March", theme: "Royal jewel tones", note: "Rich jewel tones with gold.",
      palette: ["Maroon", "Royal Blue", "Emerald", "Purple"], feature: true }
  ],

  /* ---------- Venue ----------
     photos: add 2–4 venue photos to the images folder, e.g. ["images/venue-1.jpg", "images/venue-2.jpg"]
     With no photos, a drawing of the setting is shown instead.                */
  venue: {
    name: "ITC Grand Bharat",
    city: "Gurugram, Haryana",
    address: "P.O. Hasanpur, Tauru, District Nuh (Mewat), Haryana 122105",
    mapLink: "https://www.google.com/maps/search/?api=1&query=ITC+Grand+Bharat+Gurugram",
    photos: [],
    notes: [
      "A 300-acre retreat set in the Aravalli hills, around 45 km from New Delhi.",
      "Nearest airport: Indira Gandhi International (DEL), about 40 km — roughly an hour by road.",
      "Guests stay from 28 February to 2 March 2027."
    ]
  },

  /* ---------- RSVP on WhatsApp ----------
     number: country code + number, no + or spaces, e.g. "919876543210"           */
  rsvp: {
    number: "919888278120",
    name: "Michael G. Singh",
    deadline: "31 January 2027",
    intro: "Please confirm your presence on WhatsApp by 31 January 2027, so we can plan your stay with care.",
    message: "Hello! This is {name}. We'd love to confirm our presence for Ankit & Shiwangi's wedding (28 Feb – 1 Mar 2027). Number of guests: "
  },

  /* ---------- Optional extra contacts (WhatsApp) ---------- */
  contacts: [],

  music: "default",   // "default" = Na Tum Jano Na Hum · or your own MP3, e.g. "images/our-song.mp3" · or "none" for no music

  show: {
    welcome: true, reveal: true, families: true, countdown: true,
    events: true, wardrobe: true, venue: true, gallery: true, rsvp: true, contacts: true
  }
};
