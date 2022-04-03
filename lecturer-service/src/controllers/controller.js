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
  getToConfirms: (req, res) => {
    res.json({
      message: "Nothing to confirm",
    })
  },
  confirm: (req, res) => {
    res.json({
      message: "Confirmed",
    })
  },
};

module.exports = controllers;
