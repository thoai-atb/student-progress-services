const properties = require("../../package.json");
const { CourseService } = require("../services/service");

var controllers = {
  about: (req, res) => {
    var aboutInfo = {
      name: properties.name,
      version: properties.version,
    };
    res.json(aboutInfo);
  },
  register: async (req, res) => {
    var { registration } = req.body;
    const payload = await CourseService.register(registration);
    if (payload)
      res.json({ message: "Courses registered", registration: payload });
    else res.status(500).json({ message: "Some error occured" });
  },
  registerTest: async (req, res) => {
    const { numOfRegistrations } = req.body;
    CourseService.registerTest(numOfRegistrations);
    res.json({
      message:
        "Testing performance with " + numOfRegistrations + " registrations",
    });
  },
};

module.exports = controllers;
