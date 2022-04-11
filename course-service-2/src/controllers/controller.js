const properties = require("../../package.json");
const { producer, TOPICS } = require("../kafka/kafka");
const { fireError } = require("../kafka/service-registry");

var controllers = {
  about: (req, res) => {
    var aboutInfo = {
      name: properties.name,
      version: properties.version,
    };
    res.json(aboutInfo);
  },
  register: async (req, res) => {
    try {
      var { registration } = req.body;
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
      res.json({ message: "Courses registered", registration: payload });
    } catch (error) {
      console.log(error);
      fireError({
        message: error.message,
        stack: error.stack,
      });
      res.status(500).json({ message: "Some error occured" });
    }
  },
};

module.exports = controllers;
