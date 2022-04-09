"use strict";

const controller = require("../controllers/controller");

module.exports = (app) => {
  app.route("/").get(controller.about);
  app.route("/api/political-education-progress").post(controller.updatePoliticalEducationProgress);
};