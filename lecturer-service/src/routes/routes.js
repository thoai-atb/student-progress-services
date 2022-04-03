"use strict";

const controller = require("../controllers/controller");

module.exports = (app) => {
  app.route("/").get(controller.about);
  app.route("/api/to-confirms/").get(controller.getToConfirms);
  app.route("/api/confirm").post(controller.confirm);
};