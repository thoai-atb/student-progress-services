const { STEPS, METADATA } = require("../mock/metadata.mock");
const { STUDENTS, STEP_STATUS } = require("../mock/student-data.mock");
const { snakeToTitleCase } = require("../utils/case-converter");

const MediatorService = {

  updateRegistrationStep: function (studentId) {
    const student = STUDENTS.find((student) => student.id === studentId);
    if (!student) return;
    const progressStatus = student.progressStatus;
    const progressData = progressStatus.progressData;
    const step = progressData.find((step) => step.id === STEPS.REGISTRATION);
    const items = step.items;
    const itemsCompleted = items.filter(
      (item) => item.status === "done"
    ).length;
    const itemsTotal = items.length;
    const progress = Math.round((itemsCompleted / itemsTotal) * 100);
    step.progress = progress;
    if (itemsCompleted === itemsTotal) {
      step.status = STEP_STATUS.DONE;
      step.statusName = snakeToTitleCase(STEP_STATUS.DONE);
      // NEXT STEP
      const nextStepId = STEPS.ADD_DROP;
      const nextStep = progressData.find(step => step.id === nextStepId);
      nextStep.status = STEP_STATUS.CURRENT;
      nextStep.statusName = "No status";
      progressStatus.step.id = nextStepId;
      progressStatus.step.name = METADATA.steps.find(step => step.id === nextStepId).name;
    }
  },

  updateRegistrationItem: function (studentId, itemLabel, finished, data) {
    const student = STUDENTS.find((student) => student.id === studentId);
    if (!student) throw new Error(`Student with ID ${studentId} was not found`);
    const progressData = student.progressStatus.progressData;
    const certificate = progressData.find(
      (progress) => progress.id === STEPS.REGISTRATION
    );
    const item = certificate.items.find((item) => item.label === itemLabel);
    item.status = finished ? "done" : "not done";
    item.description = data;
    this.updateRegistrationStep(studentId);
  },

  updateRegistration: function (studentId, finished, data) {
    this.updateRegistrationItem(studentId, "Registration", finished, data);
  },

  updateConfirmation: function (studentId, finished, data) {
    this.updateRegistrationItem(studentId, "Advisor Confirmation", finished, data);
  }
};

module.exports = {
  MediatorService,
};
