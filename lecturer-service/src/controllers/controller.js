const properties = require("../../package.json");
const { producer, TOPICS } = require("../kafka/kafka");
const { LecturerService } = require("../services/service");

var controllers = {
  about: (req, res) => {
    var aboutInfo = {
      name: properties.name,
      version: properties.version,
    };
    res.json(aboutInfo);
  },
  getToConfirms: (req, res) => {
    res.json(LecturerService.getToConfirms());
  },
  confirm: (req, res) => {
    const { registrationId } = req.params;
    const toConfirm = LecturerService.confirm(registrationId);
    if (!toConfirm) {
      res.status(404).json({
        message: `Registration with ID ${registrationId} was not found`,
      });
    } else {
      res.json({
        message: `Registration with ID ${registrationId} was confirmed`,
        registration: toConfirm,
      });
      producer.send({
        topic: TOPICS.REGISTRATION_CONFIRMED,
        messages: [
          {
            value: JSON.stringify(toConfirm),
          },
        ],
      });
    }
  },
};

module.exports = controllers;
