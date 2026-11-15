/* =========================================================
   REVIEWS SETUP — connected to the Always True review form.
   Reviews are saved to the "Always True — Reviews" Google Sheet.
   Only rows with "yes" in the Approved column show on the website.
   ========================================================= */
window.REVIEWS_CONFIG = {
  formAction: "https://docs.google.com/forms/d/e/1FAIpQLSeweUFBlbC09O_cjUc10YA6_yP-f6PkAJH-Ks40OTF74WZQbw/formResponse",

  fields: {
    name:   "entry.1504062260",
    lesson: "entry.911500567",
    rating: "entry.1872050219",
    review: "entry.279728923"
  },

  sheetCsv: "https://docs.google.com/spreadsheets/d/1PzWtAOewwsIdcCQ9Sx3g6aWZY7UwOxMczX-fwnJtEmE/gviz/tq?tqx=out:csv&headers=1&sheet=Form%20Responses%201",

  // true = only rows with "yes" in the Approved column are shown
  requireApproval: true
};
