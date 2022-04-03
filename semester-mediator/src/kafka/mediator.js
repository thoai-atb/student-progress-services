const { producer, TOPICS, createConsumer } = require("./kafka");

async function startMediator() {
  const consumer = await createConsumer(TOPICS.COURSE_REGISTERED);
  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message.value);
      console.log("NEW MESSAGE: ", TOPICS.COURSE_REGISTERED);
      console.log(data);
      // INSERT CODE TO STORE IN DATABASE THE PROGRESS
      await producer.connect();
      await producer.send({
        topic: TOPICS.REGISTRATION_TO_CONFIRM,
        messages: [
          {
            value: JSON.stringify(data),
          }
        ]
      });
    },
  });
}

module.exports = {
  startMediator,
};
