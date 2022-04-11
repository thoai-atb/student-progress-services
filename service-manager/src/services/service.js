const { SERVICE_GROUPS } = require("../data/service-groups");
const {
  refreshServices: refreshServicesKafka,
} = require("../kafka/service-broadcast");

const ServicesService = {
  serviceGroups: null,
  problems: null,
  resetServices: function () {
    this.serviceGroups = SERVICE_GROUPS.map((serviceGroup) => ({
      ...serviceGroup,
      services: [],
      processors: 0,
      problems: 0,
    }));
    this.problems = [];
  },
  getServices: function () {
    const services = [];
    this.serviceGroups.forEach((serviceGroup) => {
      serviceGroup.services.forEach((service) => {
        services.push(service);
      });
    });
    return services;
  },
  getServiceGroups: function () {
    return this.serviceGroups;
  },
  getProblems: function () {
    return this.problems;
  },
  refreshServices: function () {
    this.resetServices();
    refreshServicesKafka();
  },
  refreshServicesSoft: function() {
    refreshServicesKafka();
  },
  newService: function (service) {
    const { id, serviceGroupId, version, port } = service;
    const serviceGroup = this.serviceGroups.find(
      (group) => group.id === serviceGroupId
    );
    if (!serviceGroup) {
      console.log(
        `Service ${id} belongs to unknown service group ${serviceGroupId}`
      );
      return;
    }
    const existedService = serviceGroup.services.find(
      (service) => service.id === id
    );
    if (existedService) {
      console.log(`Service ${id} already exists`);
      Object.assign(existedService, service);
    } else {
      console.log(`Service ${id} added to service group ${serviceGroupId}`);
      serviceGroup.services.push({
        ...service,
        problems: 0,
      });
      serviceGroup.processors += 1;
    }
  },
  newError: function (payload) {
    const { id, serviceGroupId, error } = payload;
    this.problems.push(payload);
    const serviceGroup = this.serviceGroups.find(
      (group) => group.id === serviceGroupId
    );
    if (!serviceGroup) {
      console.log(
        `Service ${id} belongs to unknown service group ${serviceGroupId}`
      );
      return;
    }
    const existedService = serviceGroup.services.find(
      (service) => service.id === id
    );
    if (!existedService) {
      console.log(`Service ${id} does not exist`);
      console.log(`Service ${id} added to service group ${serviceGroupId}`);
      serviceGroup.services.push({
        id,
        serviceGroupId,
        problems: 1,
      });
      serviceGroup.processors += 1;
      serviceGroup.problems += 1;
    } else {
      serviceGroup.problems += 1;
      existedService.problems += 1;
    }
  },
};

ServicesService.resetServices();

module.exports = {
  ServicesService,
};
