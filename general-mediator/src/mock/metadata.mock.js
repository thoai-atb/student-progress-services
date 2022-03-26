const STEPS = {
  APPLICATION: "application",
  ENTRY_ENGLISH: "entry_english",
  IE_AE: "ie_ae",
  ACQUIRING_CREDITS: "acquiring_credits",
  THESIS: "thesis",
  CERTIFICATES: "certificates",
  FINISHED: "finished",
  DROPPED: "dropped",
};

const METADATA = {
  id: "general",
  name: "General",
  description:
    "General shows the progress of the students from start to finish in this university, including application, english progress, thesis and certificates.",
  steps: [
    {
      id: STEPS.APPLICATION,
      name: "Application",
      description:
        "Students applied to study here and waiting for their application accepted.",
    },
    {
      id: STEPS.ENTRY_ENGLISH,
      name: "Entry English",
      description: "Students need to take the entry English test.",
    },
    {
      id: STEPS.IE_AE,
      name: "IE & AE",
      description: "Students studying intensive or academic English.",
    },
    {
      id: STEPS.ACQUIRING_CREDITS,
      name: "Acquiring Credits",
      description:
        "Students who finished English courses and accumulating credits to be ready for thesis.",
    },
    {
      id: STEPS.THESIS,
      name: "Thesis",
      description: "Students working on their thesis",
    },
    {
      id: STEPS.CERTIFICATES,
      name: "Certificates",
      description:
        "Students who have finished their thesis and are missing certifications including military, English, and annual political education.",
    },
    {
      id: STEPS.FINISHED,
      name: "Finished",
      description:
        "Students who have finished their studies in this university and are ready to graduate.",
    },
    {
      id: STEPS.DROPPED,
      name: "Dropped",
      description:
        "Students who have cancel their studies in this university for any reason.",
    },
  ],
};

module.exports = { METADATA, STEPS };
