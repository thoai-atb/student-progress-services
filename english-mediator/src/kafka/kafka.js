const { Kafka } = require("kafkajs");

const TOPICS = {
};

const ID = "english-mediator";

const kafka = new Kafka({
  clientId: ID,
  brokers: ["localhost:9092"],
});

module.exports = {
  kafka,
  TOPICS,
};
