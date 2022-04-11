const { Kafka } = require("kafkajs");

const TOPICS = {
  UPDATE_CERTIFICATE: "update-certificate",
  UPDATE_POLITICAL_EDUCATION_PROGRESS: "update-political-education-progress",
};

const ID = "general-mediator";

const kafka = new Kafka({
  clientId: ID,
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: ID });

module.exports = {
  TOPICS,
  kafka,
  producer,
  consumer,
};
