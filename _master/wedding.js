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
     palette: "lotus" | "champagne" | "select" | "royal" | "emerald" | "rose" | "ocean"
     art.venue: a watercolour of the venue (wide image, about 3:1) in the images folder, e.g. "images/venue-art.jpg"
     art.florals: true shows the sage floral corners and side borders
     Each event gets a small drawn emblem chosen from its name (mandap, mehndi hand, haldi bowl, rings, dhol, cocktail, diya, dinner).
     To choose one yourself, add icon: "mandap" | "mehndi" | "haldi" | "rings" | "dhol" | "cocktail" | "diya" | "dinner" | "lotus" to the event.                                   */
  theme: { palette: "lotus", wax: "#9E2F4E" },   // wax: seal colour; e.g. "#8B1A1F" deep red, "#7A5A1E" gold
  art: { venue: "", florals: true, decor: "lotus" },   // decor: "lotus" (pink lotus) or "sage" (sage florals)

  /* true = shows the colour switcher (for The Select only). Set false before sharing with guests. */
  preview: true,

  /* ---------- The couple ---------- */
  couple: { first: "Aanya", second: "Kabir", monogram: "AK", hashtag: "" },

  blessing: "|| Shree Ganeshaya Namah ||",   // e.g. "Ik Onkar", "Bismillah", or ""

  /* ---------- Dates ----------
     countdownTo time zones: +05:30 India · +04:00 Dubai · +07:00 Thailand/Vietnam · +08:00 Malaysia/Bali · +01:00 Europe (winter) · +02:00 Europe (summer) */
  dates: {
    display: "February 14 & 15, 2027",
    countdownTo: "2027-02-15T19:00:00+05:30"
  },

  text: {
    request: "Request the pleasure of your company as they celebrate their wedding",
    welcomeBody: "With the blessings of our elders, we are beginning our journey together — and it would mean the world to celebrate it with you.",
    countdownTitle: "Countdown to our wedding",
    eventsTitle: "Wedding events",
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
    name: "The Select",
    deadline: "",
    intro: "Please confirm your presence on WhatsApp, so we can plan your stay with care.",
    message: "Hello! This is {name}. We'd love to confirm our presence for Aanya & Kabir's wedding. Number of guests: "
  },

  contacts: [],   // e.g. [{ name: "Shikha Sharma", role: "Event adviser · The Select", whatsapp: "91XXXXXXXXXX" }]
  music: "default",   // "default" = Na Tum Jano Na Hum · or your own MP3, e.g. "images/our-song.mp3" · or "none" for no music

  show: { welcome: true, families: true, countdown: true, events: true, venue: true, gallery: true, rsvp: true, contacts: true }
};
