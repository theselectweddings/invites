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
     palette: "champagne" | "select" | "royal" | "emerald" | "rose" | "ocean"
     art.venue: a watercolour of the venue (wide image, about 3:1) in the images folder
     art.florals: true shows the sage floral corners                                   */
  theme: { palette: "champagne" },
  art: { venue: "images/venue-art.jpg", florals: true },

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
    countdownTo: "2027-03-01T17:00:00+05:30"
  },

  /* ---------- Text ---------- */
  text: {
    request: "Request the pleasure of your company as they celebrate their wedding",
    welcomeBody: "Amidst the Aravalli hills, we begin our forever — with mehndi in the sunshine, a night of music and dance, and vows around the sacred fire. Your blessings and your presence would make it complete.",
    countdownTitle: "Countdown to our wedding",
    eventsTitle: "Wedding events",
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
          note: "Welcome drinks, mehndi for everyone, a leisurely lunch, dhol and games in the afternoon sun.",
          moments: [],
          image: "", start: "2027-02-28T12:00:00+05:30", end: "2027-02-28T15:30:00+05:30"
        },
        {
          name: "Engagement & Sangeet", time: "7 PM onwards", venue: "ITC Grand Bharat", dress: "", colour: "",
          note: "Cocktails, the couple's grand entry and ring ceremony, family performances, a live band — and an after-party that runs late.",
          moments: [["7:00 PM", "Cocktails"], ["8:00 PM", "Couple's entry & ring ceremony"], ["8:55 PM", "Sangeet performances"], ["10:30 PM", "Dinner"]],
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
          note: "Brunch, dhol and games, a shower of marigold petals — then haldi for the couple (and probably for you too).",
          moments: [],
          image: "", start: "2027-03-01T11:00:00+05:30", end: "2027-03-01T14:45:00+05:30"
        },
        {
          name: "Wedding Ceremony", time: "5 PM onwards", venue: "ITC Grand Bharat", dress: "", colour: "",
          note: "From the sehra bandi and baraat to the varmala and pheras under the stars, followed by dinner and the after-party.",
          moments: [["5:00 PM", "Sehra Bandi"], ["6:00 PM", "Baraat"], ["7:00 PM", "Bride's entry & Varmala"], ["8:00 PM", "Pheras"], ["10:00 PM", "Dinner"], ["12:00 AM", "After-party"]],
          image: "", start: "2027-03-01T17:00:00+05:30", end: "2027-03-02T01:00:00+05:30"
        }
      ]
    }
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
    number: "",
    name: "The Select",
    deadline: "31 January 2027",
    intro: "Please confirm your presence on WhatsApp by 31 January 2027, so we can plan your stay with care.",
    message: "Hello! This is {name}. We'd love to confirm our presence for Ankit & Shiwangi's wedding (28 Feb – 1 Mar 2027). Number of guests: "
  },

  /* ---------- Optional extra contacts (WhatsApp) ---------- */
  contacts: [],

  music: "",

  show: {
    welcome: true, families: true, countdown: true,
    events: true, venue: true, gallery: true, rsvp: true, contacts: true
  }
};
