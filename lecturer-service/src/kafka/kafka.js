const { Kafka } = require("kafkajs");

const TOPICS = {
  REGISTRATION_TO_CONFIRM: "registration-to-confirm",
  REGISTRATION_CONFIRMED: "registration-confirmed",
};

const ID = "lecturer-service";

const kafka = new Kafka({
  clientId: ID,
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

async function createConsumer(topic) {
  const consumer = kafka.consumer({ groupId: ID });
  await consumer.connect();
  await consumer.subscribe({
    topic,
    fromBeginning: true,
  });
  return consumer;
}


module.exports = {
  kafka,
  producer,
  createConsumer,
  TOPICS,
};
