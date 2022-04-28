const { STEPS } = require("./metadata.mock");

const STEP_ITEMS = {
  [STEPS.REGISTRATION]: ["Registration", "Advisor Confirmation"],
  [STEPS.ADD_DROP]: ["Update Registration", "Advisor Confirmation"],
  [STEPS.PAYMENT]: ["Payment Received", "Payment Confirmation"],
  [STEPS.MIDTERM]: ["Midterm Schedule", "Midterm Exam"],
  [STEPS.FINAL]: ["Final Schedule", "Final Exam"],
  [STEPS.WAITING_RESULTS]: ["Midterm Result", "Final Result", "All Results"],
};

module.exports = {
  STEP_ITEMS,
};
