"use strict";

const properties = require("../../package.json");
const { MediatorsAPI } = require("../api/mediators-api");
const { STUDENT_YEARS } = require("../utils/mock/metadata-mock");
const { MediatorController } = require("./mediators-controller");

var controllers = {
  about: (req, res) => {
    var aboutInfo = {
      name: properties.name,
      version: properties.version,
    };
    res.json(aboutInfo);
  },
  login: (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "hadouken") {
      res.json({
        success: true,
        message: "Login successful",
        token: Math.random().toString(36).substring(2, 15),
      });
    } else {
      res.json({
        success: false,
        message: "Login failed",
      });
    }
  },
  getStudentYears(req, res) {
    var limit = req.query.limit || 100;
    const studentYears = STUDENT_YEARS.slice(0, limit);
    res.json(studentYears);
  },
  getProgressCategories: MediatorController.getProgressCategories,
  getStudentDistributions: MediatorController.getStudentDistributions,
  getStudents: MediatorController.getStudents,
  getStudent: MediatorController.getStudent,
  getProcessors: MediatorController.getProcessors,
  async test(req, res) {
    try {
      const response = await MediatorsAPI.getMetadata(req.query.mediator);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ message: "Could not connect to mediator" });
    }
  },
};

module.exports = controllers;
