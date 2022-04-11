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
  getProblems: (req, res) => {
    res.json(ServicesService.getProblems());
  },
  refreshServices: (req, res) => {
    ServicesService.refreshServices();
    res.json({
      message: "Refreshing services",
    });
  },
  refreshServicesSoft: (req, res) => {
    ServicesService.refreshServicesSoft();
    res.json({
      message: "Refreshing services soft",
    });
  }
};

module.exports = controllers;
