const { Kafka } = require("kafkajs");

const TOPICS = {
  COURSE_REGISTERED: "course-registered",
  REGISTRATION_TO_CONFIRM: "registration-to-confirm",
};

const ID = "course-service";

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
