const { Kafka } = require("kafkajs");

const TOPICS = {
  COURSE_REGISTERED: "course-registered",
  REGISTRATION_TO_CONFIRM: "registration-to-confirm",
  REGISTRATION_CONFIRMED: "registration-confirmed",
};

const ID = "semester-mediator";

const kafka = new Kafka({
  clientId: ID,
  brokers: ["localhost:9092"],
  connectionTimeout: 10000,
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: ID });

module.exports = {
  TOPICS,
  producer,
  kafka,
  consumer,
};
