const { producer, TOPICS } = require("./kafka");

const refreshServices = async () => {
  await producer.connect();
  await producer.send({
    topic: TOPICS.SERVICE_BROADCAST,
    messages: [
      {
        value: JSON.stringify({
          action: "refresh",
        }),
      },
    ],
  });
};

module.exports = {
  refreshServices,
};