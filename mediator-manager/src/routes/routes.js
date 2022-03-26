"use strict";

const controller = require("../controllers/controller");

module.exports = (app) => {
  app.route("/").get(controller.about);
  app.route("/api/progress-categories").get(controller.getProgressCategories);
  app.route("/api/student-years").get(controller.getStudentYears);
  app.route("/api/distributions/:studentYear").get(controller.getStudentDistributions);
  app.route("/api/students/:progressCategory").get(controller.getStudents);
  app.route("/api/student/:studentId/:progressCategory").get(controller.getStudent);
  app.route("/api/processors/:progressCategory").get(controller.getProcessors);
  app.route("/api/login").post(controller.login);
  app.route("/api/test").get(controller.test);
};
