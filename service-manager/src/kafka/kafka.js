const { Kafka } = require("kafkajs");

const TOPICS = {
  SERVICE_ON: "service-on",
  SERVICE_ERROR: "service-error",
  SERVICE_BROADCAST: "service-broadcast",
};

const ID = "service-manager";

const kafka = new Kafka({
  clientId: ID,
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: ID });

module.exports = {
  TOPICS,
  producer,
  consumer,
};
