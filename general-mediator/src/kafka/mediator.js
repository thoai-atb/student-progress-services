const { STUDENTS } = require("../mock/student-data.mock");
const { producer, TOPICS, consumer } = require("./kafka");
const { MediatorService } = require("../services/service");

async function startMediator() {
  await consumer.connect();
  consumer.subscribe({ topic: TOPICS.UPDATE_CERTIFICATE });
  consumer.subscribe({ topic: TOPICS.UPDATE_POLITICAL_EDUCATION_PROGRESS });

  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      switch (topic) {
        case TOPICS.UPDATE_CERTIFICATE:
          await onUpdateCertificate(message);
          break;
        case TOPICS.UPDATE_POLITICAL_EDUCATION_PROGRESS:
          await onUpdatePoliticalEducationProgress(message);
          break;
      }
    },
  });
}

async function onUpdateCertificate(message) {
  console.log("NEW MESSAGE: ", TOPICS.UPDATE_CERTIFICATE);
  const value = JSON.parse(message.value);
  console.log(value);
  const { studentId, certificateId, finished, data } = value;
  if(certificateId === "english") {
    MediatorService.updateEnglishCertificate(studentId, finished, data);
  } else if (certificateId === "military") {
    MediatorService.updateMilitaryCertificate(studentId, finished, data);
  }
}

async function onUpdatePoliticalEducationProgress(message) {
  console.log("NEW MESSAGE: ", TOPICS.UPDATE_POLITICAL_EDUCATION_PROGRESS);
  const value = JSON.parse(message.value);
  console.log(value);
  const { studentId, finished, data } = value;
  MediatorService.updatePoliticalEducationProgress(studentId, finished, data);
}

module.exports = {
  startMediator,
};
