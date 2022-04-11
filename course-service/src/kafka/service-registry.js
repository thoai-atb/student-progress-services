const { kafka } = require("./kafka");
const properties = require("../../package.json");

const TOPICS = {
  SERVICE_ON: "service-on",
  SERVICE_ERROR: "service-error",
  SERVICE_BROADCAST: "service-broadcast",
};

async function registerService(port) {
  const producer = kafka.producer();
  await producer.connect();
  await fireServiceOn(producer, port);
  const consumer = kafka.consumer({
    groupId: properties.name + " " + properties.version,
  });
  await consumer.connect();
  await consumer.subscribe({ topic: TOPICS.SERVICE_BROADCAST });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = JSON.parse(message.value);
      console.log("NEW MESSAGE: ", topic);
      console.log(value);
      if (topic === TOPICS.SERVICE_BROADCAST) {
        const action = value.action;
        if (action === "refresh") {
          await fireServiceOn(producer, port);
        }
      }
    },
  });
}

async function fireServiceOn(producer, port) {
  await producer.send({
    topic: TOPICS.SERVICE_ON,
    messages: [
      {
        value: JSON.stringify({
          id: properties.name + " " + properties.version,
          serviceGroupId: properties.name,
          version: properties.version,
          port: port,
        }),
      },
    ],
  });
}

async function fireError(error) {
  const producer = kafka.producer();
  await producer.connect();
  await producer.send({
    topic: TOPICS.SERVICE_ERROR,
    messages: [
      {
        value: JSON.stringify({
          id: properties.name + " " + properties.version,
          serviceGroupId: properties.name,
          error: error,
          time: new Date(),
        }),
      },
    ],
  });
  await producer.disconnect();
}

module.exports = {
  TOPICS,
  registerService,
  fireError,
};
