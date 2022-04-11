const { Kafka } = require("kafkajs");

const TOPICS = {
  UPDATE_POLITICAL_EDUCATION_PROGRESS: "update-political-education-progress",
};

const ID = "iuoss-service";

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
