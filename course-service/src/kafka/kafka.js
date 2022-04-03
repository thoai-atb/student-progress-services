const { Kafka } = require("kafkajs");

const TOPICS = {
  COURSE_REGISTERED: "course-registered",
};

const ID = "course-service";

const kafka = new Kafka({
  clientId: ID,
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

module.exports = {
  producer,
  TOPICS,
};
