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
  updatePoliticalEducationProgress: async (req, res) => {
    const { studentId, finished, data } = req.body;
    console.log("Update Political Education Progress: ");
    console.log(req.body);
    const obj = {
      studentId,
      finished,
      data,
    };
    await producer.connect();
    await producer.send({
      topic: TOPICS.UPDATE_POLITICAL_EDUCATION_PROGRESS,
      messages: [
        {
          value: JSON.stringify(obj),
        },
      ],
    });
    res.json({
      message: "Political Education Progress Updated",
      content: obj,
    });
  },
};

module.exports = controllers;
