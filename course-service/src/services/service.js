const { producer, TOPICS } = require("../kafka/kafka");
const { fireError } = require("../kafka/service-registry");

const CourseService = {
  register: async (registration) => {
    try {
      const { studentId, courseIds } = registration;
      console.log("New registration: ", registration);
      const randomId = Math.floor(Math.random() * 1000000);
      const payload = {
        registrationId: randomId,
        studentId,
        courseIds,
      };
      await producer.connect();
      await producer.send({
        topic: TOPICS.COURSE_REGISTERED,
        messages: [
          {
            value: JSON.stringify(payload),
          },
        ],
      });
      return payload;
    } catch (error) {
      console.log(error);
      fireError({
        message: error.message,
        stack: error.stack,
      });
      return null;
    }
  },

  registerTest: async (numOfRegistrations) => {
    console.log(
      "Testing performance with ",
      numOfRegistrations,
      " registrations"
    );
    try {
      var registrations = [];
      const batches = [];
      const batchSize = 1000;
      for (let i = 0; i < numOfRegistrations; i++) {
        const randomId = Math.floor(Math.random() * 1000000);
        const padI = `${i.toString().padStart(3, "0")}`;
        const signal =
          i === 0 ? "START" : i === numOfRegistrations - 1 ? "END" : "IU";
        const payload = {
          registrationId: randomId,
          studentId: `TEST${numOfRegistrations}${signal}${padI}`,
          courseIds: [`Registration ${padI}`],
          isTest: true,
        };
        registrations.push(payload);
        if (registrations.length === batchSize) {
          batches.push(registrations);
          registrations = [];
        }
      }
      if (registrations.length > 0) batches.push(registrations);
      await producer.connect();
      for (const batch of batches) {
        await producer.send({
          topic: TOPICS.COURSE_REGISTERED,
          messages: batch.map((registration) => ({
            value: JSON.stringify(registration),
          })),
        });
      }
      console.log("Testing ended, total batches: ", batches.length);
      return batches;
    } catch (error) {
      console.log(error);
      fireError({
        message: error.message,
        stack: error.stack,
      });
      return null;
    }
  },

  registerLatencyTest: async (direct) => {
    const randomId = Math.floor(Math.random() * 1000000);
    const padI = `${(0).toString().padStart(3, "0")}`;
    const signal = "LATEN";
    const payload = {
      registrationId: randomId,
      studentId: `TEST${000}${signal}${padI}`,
      courseIds: [`Registration ${padI}`],
      isTest: true,
    };
    const topic = direct
      ? TOPICS.REGISTRATION_TO_CONFIRM
      : TOPICS.COURSE_REGISTERED;
    await producer.connect();
    await producer.send({
      topic: topic,
      messages: [{ value: JSON.stringify(payload) }],
    });
    console.log("Register latency: message produced at time: ", new Date().getTime());
  },
};

module.exports = {
  CourseService,
};
