const { LecturerService } = require("../services/service");
const { createConsumer, TOPICS, producer } = require("./kafka");

const listenCourseRegistered = async () => {
  await producer.connect();
  const consumer = await createConsumer(TOPICS.REGISTRATION_TO_CONFIRM);
  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const toConfirm = JSON.parse(message.value);
      console.log("NEW MESSAGE: ", TOPICS.REGISTRATION_TO_CONFIRM);
      console.log(toConfirm);
      LecturerService.addToConfirm(toConfirm);
    },
  });
};

module.exports = {
  listenCourseRegistered,
};
