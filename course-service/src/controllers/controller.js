const properties = require("../../package.json");
const { producer, TOPICS } = require("../kafka/kafka");

var controllers = {
  about: (req, res) => {
    var aboutInfo = {
      name: properties.name,
      version: properties.version,
    };
    res.json(aboutInfo);
  },
  register: async (req, res) => {
    var { studentId, courseIds } = req.body;
    console.log("studentId: " + studentId);
    console.log("courseIds: " + courseIds);
    const randomId = Math.floor(Math.random() * 1000000);
    const registration = {
      registrationId: randomId,
      studentId,
      courseIds,
    };
    await producer.connect();
    await producer.send({
      topic: TOPICS.COURSE_REGISTERED,
      messages: [
        {
          value: JSON.stringify(registration),
        },
      ],
    });
    res.json({ message: "Courses registered", registration: registration });
  },
};

module.exports = controllers;
