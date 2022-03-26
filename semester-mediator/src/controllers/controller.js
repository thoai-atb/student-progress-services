const properties = require("../../package.json");
const { getStudentData, browse } = require("../mock/browse.mock");
const { getMetadata, getDistribution, getProcessors } = require("../mock/mock");

var controllers = {
  about: (req, res) => {
    var aboutInfo = {
      name: properties.name,
      version: properties.version,
    };
    res.json(aboutInfo);
  },
  getMetadata: (req, res) => {
    res.json(getMetadata());
  },
  getDistribution: (req, res) => {
    var studentYear = req.params.studentYear;
    res.json(getDistribution(studentYear));
  },
  getProcessors: (req, res) => {
    res.json(getProcessors());
  },
  getStudents: (req, res) => {
    const {
      studentYear,
      status,
      studentId,
      studentName,
      page = 1,
      size = 10,
    } = req.query;
    res.json(
      browse({
        studentYear,
        status,
        studentId,
        studentName,
        page,
        size,
      })
    );
  },
  getStudent: (req, res) => {
    const { studentId } = req.params;
    res.json(getStudentData(studentId));
  },
};

module.exports = controllers;
