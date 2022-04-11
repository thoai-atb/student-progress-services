const { producer, TOPICS, consumer } = require("./kafka");
const { ServicesService } = require("../services/service");

async function listenToServices() {
  await consumer.connect();
  await consumer.subscribe({ topic: TOPICS.SERVICE_ON });
  await consumer.subscribe({ topic: TOPICS.SERVICE_ERROR });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      switch (topic) {
        case TOPICS.SERVICE_ON:
          onServiceOn(message);
          break;
        case TOPICS.SERVICE_ERROR:
          onServiceError(message);
          break;
      }
    },
  });
}

async function onServiceOn(message) {
  const value = JSON.parse(message.value);
  console.log("NEW MESSAGE: ", TOPICS.SERVICE_ON);
  console.log(value);
  ServicesService.newService(value);
}

async function onServiceError(message) {
  const value = JSON.parse(message.value);
  console.log("NEW MESSAGE: ", TOPICS.SERVICE_ERROR);
  console.log(value);
  ServicesService.newError(value);
}

module.exports = {
  listenToServices,
};
