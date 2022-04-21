const { STEPS, METADATA } = require("../mock/metadata.mock");
const { STUDENTS, STEP_STATUS } = require("../mock/student-data.mock");
const { snakeToTitleCase } = require("../utils/case-converter");

const MediatorService = {

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
    // this.updateCertificatesStep(studentId);
  },

  updateRegistration: function (studentId, finished, data) {
    this.updateRegistrationItem(studentId, "Registration", finished, data);
  }

};

module.exports = {
  MediatorService,
};
