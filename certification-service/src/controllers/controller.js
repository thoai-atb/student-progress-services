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
  updateEnglishCertificate: async (req, res) => {
    const { studentId, finished, data } = req.body;
    console.log("Update English Certificate: ");
    console.log(req.body);
    const obj = {
      studentId,
      certificateId: "english",
      finished,
      data,
    };
    await producer.connect();
    await producer.send({
      topic: TOPICS.UPDATE_CERTIFICATE,
      messages: [
        {
          value: JSON.stringify(obj),
        },
      ],
    });
    res.json({
      message: "English Certificate updated",
      content: obj,
    });
  },
  updateMilitaryCertificate: async (req, res) => {
    const { studentId, finished, data } = req.body;
    console.log("Update Military Certificate: ");
    console.log(req.body);
    const obj = {
      studentId,
      certificateId: "military",
      finished,
      data,
    };
    await producer.connect();
    await producer.send({
      topic: TOPICS.UPDATE_CERTIFICATE,
      messages: [
        {
          value: JSON.stringify(obj),
        },
      ],
    });
    res.json({
      message: "Military Certificate updated",
      content: obj,
    });
  },
};

module.exports = controllers;
