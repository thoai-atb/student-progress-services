const { MediatorService } = require("../services/service");
const { producer, TOPICS, consumer } = require("./kafka");
const { fireError } = require("./service-registry");
var startTestTime, numMessagesTest;

async function startMediator() {
  await consumer.connect();
  consumer.subscribe({ topic: TOPICS.COURSE_REGISTERED });
  consumer.subscribe({ topic: TOPICS.REGISTRATION_CONFIRMED });
  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message.value);
      if (!data.isTest) {
        console.log("NEW MESSAGE: ", topic);
        console.log(data);
      }
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
  const { studentId, courseIds, isTest } = data;

  if (isTest) {
    if (studentId.includes("START")) {
      console.log("START TESTING...");
      startTestTime = Date.now();
      numMessagesTest = 0;
    }
    numMessagesTest++;
    // console.log("TEST REGISTRATION: " + studentId);
    if (studentId.includes("END")) {
      const endTestTime = Date.now();
      const testTime = endTestTime - startTestTime;
      console.log(
        `TEST ENDED, TOTAL TIME: ${testTime}ms, ${numMessagesTest} MESSAGES IN TOTAL`
      );
    }
    if (studentId.includes("LATEN")) {
      await producer.connect();
      await producer.send({
        topic: TOPICS.REGISTRATION_TO_CONFIRM,
        messages: [
          {
            value: JSON.stringify(data),
          },
        ],
      });
      console.log("LATENCY TEST: message produced at time:", new Date().getTime());
    }
    return;
  }

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
