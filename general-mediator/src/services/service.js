const { STEPS, METADATA } = require("../mock/metadata.mock");
const { STUDENTS, STEP_STATUS } = require("../mock/student-data.mock");
const { snakeToTitleCase } = require("../utils/case-converter");

const MediatorService = {
  // updateStepProgress: function (studentId) {
  //   const student = STUDENTS.find((student) => student.id === studentId);
  //   if (!student) return;
  //   const progressStatus = student.progressStatus;
  //   const currentStepId = progressStatus.step.id;
  //   if (currentStepId === STEPS.FINISHED || currentStepId === STEPS.DROPPED)
  //     return;
  //   const currentStepIndex = (() => {
  //     for (let i = 0; i < METADATA.steps.length; i++) {
  //       if (METADATA.steps[i].id === currentStepId) return i;
  //     }
  //     return -1;
  //   })();
  //   const nextStepIndex = currentStepIndex + 1;
  //   const nextStepId = METADATA.steps[nextStepIndex].id;
  //   const progressData = progressStatus.progressData;
  //   console.log({
  //     currentStepIndex,
  //     currentStepId,
  //     nextStepIndex,
  //     nextStepId,
  //     progressData,
  //   });
  //   var stepCompleted = true;
  //   const step = progressData.find((step) => step.id === currentStepId);
  //   if (step.items?.length > 0) {
  //     const itemsCompleted = step.items.filter(
  //       (item) => item.status === "done"
  //     ).length;
  //     const itemsTotal = step.items.length;
  //     const progress = Math.round((itemsCompleted / itemsTotal) * 100);
  //     step.progress = progress;
  //     console.log({
  //       itemsCompleted,
  //       itemsTotal,
  //       progress,
  //     });
  //     if (itemsCompleted !== itemsTotal) {
  //       stepCompleted = false;
  //     }
  //   }
  //   if (stepCompleted) {
  //     // next step
  //     progressStatus.step.id = nextStepId;
  //     progressStatus.step.name = METADATA.steps[nextStepIndex].name;
  //     progressData[nextStepIndex].status = STEP_STATUS.CURRENT;
  //     progressData[nextStepIndex].statusName = snakeToTitleCase(
  //       STEP_STATUS.CURRENT
  //     );
  //     progressData[currentStepIndex].status = STEP_STATUS.DONE;
  //     progressData[currentStepIndex].statusName = snakeToTitleCase(
  //       STEP_STATUS.DONE
  //     );
  //   }
  // },
  updateCertificatesStep: function (studentId) {
    const student = STUDENTS.find((student) => student.id === studentId);
    if (!student) return;
    const progressStatus = student.progressStatus;
    const progressData = progressStatus.progressData;
    const step = progressData.find((step) => step.id === STEPS.CERTIFICATES);
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
      nextStep = progressData.find(step => step.id === STEPS.FINISHED);
      nextStep.status = STEP_STATUS.CURRENT;
      nextStep.statusName = snakeToTitleCase(STEP_STATUS.CURRENT);
      progressStatus.step.id = STEPS.FINISHED;
      progressStatus.step.name = METADATA.steps.find(step => step.id === STEPS.FINISHED).description;
    }
    console.log({
      itemsCompleted,
      itemsTotal,
      progress,
      status: progressStatus.step.id,
    });
  },

  updateCertificate: function (studentId, itemLabel, finished, data) {
    const student = STUDENTS.find((student) => student.id === studentId);
    if (!student) return;
    // console.log("Student found: ", student);
    const progressData = student.progressStatus.progressData;
    const certificate = progressData.find(
      (progress) => progress.id === STEPS.CERTIFICATES
    );
    const item = certificate.items.find((item) => item.label === itemLabel);
    item.status = finished ? "done" : "not done";
    item.description = data;
    this.updateCertificatesStep(studentId);
  },

  updateEnglishCertificate: function (studentId, finished, data) {
    this.updateCertificate(studentId, "English Certificate", finished, data);
  },

  updateMilitaryCertificate: function (studentId, finished, data) {
    this.updateCertificate(studentId, "Military Certificate", finished, data);
  },

  updatePoliticalEducationProgress: function (studentId, finished, data) {
    this.updateCertificate(studentId, "Political Education", finished, data);
  },
};

module.exports = {
  MediatorService,
};
