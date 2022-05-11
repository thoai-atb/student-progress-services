const { MediatorService } = require("../services/service");
const { producer, TOPICS, consumer } = require("./kafka");
const { fireError } = require("./service-registry");

async function startMediator() {
  await consumer.connect();
  consumer.subscribe({ topic: TOPICS.COURSE_REGISTERED });
  consumer.subscribe({ topic: TOPICS.REGISTRATION_CONFIRMED });
  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message.value);
      console.log("NEW MESSAGE: ", topic);
      console.log(data);
      switch (topic) {
        case TOPICS.COURSE_REGISTERED:
          onCourseRegistered(data);
          break;
        case TOPICS.REGISTRATION_CONFIRMED:
          onRegistrationConfirmed(data);
          break;
      }
    },
  });
}

async function onCourseRegistered(data) {
  const { studentId, courseIds } = data;
  try {
    MediatorService.updateRegistration(studentId, true, courseIds.join(", "));
    await producer.connect();
    await producer.send({
      topic: TOPICS.REGISTRATION_TO_CONFIRM,
      messages: [
        {
          value: JSON.stringify(data),
        },
      ],
    });
  } catch (error) {
    console.log(error);
    fireError({
      message: error.message,
      stack: error.stack,
      eventMessage: data,
      eventTopic: TOPICS.COURSE_REGISTERED,
    });
  }
}

async function onRegistrationConfirmed(data) {
  const { studentId } = data;
  try {
    MediatorService.updateConfirmation(studentId, true, "Confirmed");
  } catch (error) {
    console.log(error);
    fireError({
      message: error.message,
      stack: error.stack,
      eventMessage: data,
      eventTopic: TOPICS.REGISTRATION_CONFIRMED,
    });
  }
}

module.exports = {
  startMediator,
};
