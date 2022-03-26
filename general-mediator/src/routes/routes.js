"use strict";

const controller = require("../controllers/controller");

module.exports = (app) => {
  app.route("/").get(controller.about);
  app.route("/api/metadata").get(controller.getMetadata);
  app.route("/api/distribution/:studentYear").get(controller.getDistribution);
  app.route("/api/processors").get(controller.getProcessors);
  app.route("/api/students").get(controller.getStudents);
  app.route("/api/student/:studentId").get(controller.getStudent);
};
