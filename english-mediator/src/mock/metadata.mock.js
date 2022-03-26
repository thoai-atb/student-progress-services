const STEPS = {
  ENGLISH_TEST: "english_test",
  IE_1: "ie_1",
  IE_2: "ie_2",
  IE_3: "ie_3",
  AE_1: "ae_1",
  AE_2: "ae_2",
  FINISHED: "finished",
  DROPPED: "dropped",
};

const METADATA = {
  id: "english",
  name: "English",
  description:
    "English progress shows the order of english classes the students are taking for this univeristy.",
  steps: [
    {
      id: STEPS.ENGLISH_TEST,
      name: "English Test",
      description:
        "English Entry Test (EET) is a test that is used to determine the students' English level.",
    },
    {
      id: STEPS.IE_1,
      name: "IE 1",
      description: "Intensive English 1",
    },
    {
      id: STEPS.IE_2,
      name: "IE 2",
      description: "Intensive English 2",
    },
    {
      id: STEPS.IE_3,
      name: "IE 3",
      description: "Intensive English 3",
    },
    {
      id: STEPS.AE_1,
      name: "AE 1",
      description: "Academic English 1",
    },
    {
      id: STEPS.AE_2,
      name: "AE 2",
      description: "Academic English 2",
    },
    {
      id: STEPS.FINISHED,
      name: "Finished",
      description: "Students who have finished all English courses.",
    },
    {
      id: STEPS.DROPPED,
      name: "Dropped",
      description: "Students who dropped.",
    },
  ],
};

module.exports = { METADATA, STEPS };
