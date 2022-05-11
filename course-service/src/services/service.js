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
      const registrations = [];
      for (let i = 0; i < numOfRegistrations; i++) {
        const randomId = Math.floor(Math.random() * 1000000);
        const padI = `${(i).toString().padStart(3, "0")}`;
        const payload = {
          registrationId: randomId,
          studentId: `TEST${numOfRegistrations}IU${padI}`,
          courseIds: [`Registration ${padI}`],
        };
        registrations.push(payload);
      }
      await producer.connect();
      await producer.send({
        topic: TOPICS.COURSE_REGISTERED,
        messages: registrations.map((registration) => ({
          value: JSON.stringify(registration),
        })),
      });
      console.log("Testing ended");
      return registrations;
    } catch (error) {
      console.log(error);
      fireError({
        message: error.message,
        stack: error.stack,
      });
      return null;
    }
  },
};

module.exports = {
  CourseService,
};
