const { MediatorService } = require("../services/service");
const { producer, TOPICS, createConsumer } = require("./kafka");
const { fireError } = require("./service-registry");

async function startMediator() {
  const consumer = await createConsumer(TOPICS.COURSE_REGISTERED);
  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message.value);
      console.log("NEW MESSAGE: ", topic);
      console.log(data);
      await onCourseRegistered(data);
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

module.exports = {
  startMediator,
};
