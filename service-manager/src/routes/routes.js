"use strict";

const controller = require("../controllers/controller");

module.exports = (app) => {
  app.route("/").get(controller.about);
  app.route("/api/services").get(controller.getServices);
  app.route("/api/service-groups").get(controller.getServiceGroups);
  app.route("/api/service-groups").post(controller.addServiceGroup);
  app.route("/api/problems").get(controller.getProblems);
  app.route("/api/resolve-problem/:errorId").post(controller.resolveProblem);
  app.route("/api/refresh-services").post(controller.refreshServices);
  app.route("/api/refresh-services-soft").post(controller.refreshServicesSoft);
};
