const { STEPS } = require("./metadata.mock");

const STEP_ITEMS = {
  [STEPS.APPLICATION]: [
    "Resume Confirmation",
    "Application Confirmation",
    "Requirements Verification",
  ],
  [STEPS.ENTRY_ENGLISH]: [
    "Registration",
    "English Test",
    "Result",
  ],
  [STEPS.IE_AE]: [
    "IE 1",
    "IE 2",
    "IE 3",
    "AE 1",
    "AE 2",
  ],
  [STEPS.ACQUIRING_CREDITS]: [
    "Compulsory Courses",
    "Elective Courses",
  ],
  [STEPS.THESIS]: [
    "Course Registration",
    "Topic Registration",
    "Defense",
    "Thesis Result",
  ],
  [STEPS.CERTIFICATES]: [
    "English Certificate",
    "Military Certificate",
    "Political Education",
  ],
};

module.exports = {
  STEP_ITEMS,
}
