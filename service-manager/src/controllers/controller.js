const properties = require("../../package.json");
const { ServicesService } = require("../services/service");

var controllers = {
  about: (req, res) => {
    var aboutInfo = {
      name: properties.name,
      version: properties.version,
    };
    res.json(aboutInfo);
  },
  getServices: (req, res) => {
    var services = ServicesService.getServices();
    res.json(services);
  },
  getServiceGroups: (req, res) => {
    res.json(ServicesService.getServiceGroups());
  },
  addServiceGroup: (req, res) => {
    ServicesService.addServiceGroup(req.body);
    res.json({
      message: "Service group added",
      payload: req.body,
    });
  },
  getProblems: (req, res) => {
    res.json(ServicesService.getProblems());
  },
  resolveProblem: (req, res) => {
    res.json(ServicesService.resolveError(req.params.errorId));
  },
  refreshServices: (req, res) => {
    ServicesService.refreshServices();
    res.json({
      message: "Refreshed services",
    });
  },
  refreshServicesSoft: (req, res) => {
    ServicesService.refreshServicesSoft();
    res.json({
      message: "Refreshed services soft",
    });
  },
};

module.exports = controllers;
