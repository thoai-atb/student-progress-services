"use strict";

const controller = require("../controllers/controller");

module.exports = (app) => {
  app.route("/").get(controller.about);
  app.route("/api/english").post(controller.updateEnglishCertificate);
  app.route("/api/military").post(controller.updateMilitaryCertificate);
};