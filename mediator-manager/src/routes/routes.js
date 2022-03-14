"use strict";

const controller = require("../controllers/controller");

module.exports = (app) => {
  app.route("/").get(controller.about);
  app.route("/api/progress-categories").get(controller.getProgressCategories);
  app.route("/api/student-years").get(controller.getStudentYears);
  app.route("/api/students-data/:studentYearId").get(controller.getStudentsData);
};
