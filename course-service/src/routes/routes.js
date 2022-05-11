"use strict";

const controller = require("../controllers/controller");

module.exports = (app) => {
  app.route("/").get(controller.about);
  app.route("/api/register").post(controller.register);
  app.route("/api/register-test").post(controller.registerTest);
};