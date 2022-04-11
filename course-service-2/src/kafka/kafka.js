const { Kafka } = require("kafkajs");

const TOPICS = {
  COURSE_REGISTERED: "course-registered",
};

const ID = "course-service-2";

const kafka = new Kafka({
  clientId: ID,
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

module.exports = {
  kafka,
  producer,
  TOPICS,
};
