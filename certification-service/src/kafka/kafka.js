const { Kafka } = require("kafkajs");

const TOPICS = {
  UPDATE_CERTIFICATE: "update-certificate",
};

const ID = "certification-service";

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
  producer,
  createConsumer,
  TOPICS,
};
