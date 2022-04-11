const { Kafka } = require("kafkajs");

const TOPICS = {
  COURSE_REGISTERED: "course-registered",
  REGISTRATION_TO_CONFIRM: "registration-to-confirm",
};

const kafka = new Kafka({
  clientId: "semester-mediator",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

async function createConsumer(topic) {
  const consumer = kafka.consumer({ groupId: "semester-mediator" });
  await consumer.connect();
  await consumer.subscribe({
    topic,
    fromBeginning: true,
  });
  return consumer;
}

module.exports = {
  TOPICS,
  producer,
  kafka,
  createConsumer,
};
