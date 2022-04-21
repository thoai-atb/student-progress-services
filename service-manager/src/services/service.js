const { SERVICE_GROUPS } = require("../data/service-groups");
const {
  refreshServices: refreshServicesKafka,
} = require("../kafka/service-broadcast");
const { ErrorHandlingService } = require("./error-handling-service");

const ServicesService = {
  serviceGroups: null,
  problems: null,
  resetServices: function () {
    this.serviceGroups = SERVICE_GROUPS.map((serviceGroup) => ({
      ...serviceGroup,
      services: [],
      processors: 0,
      problems: 0,
      resolvedProblems: 0,
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
  addServiceGroup: function (serviceGroup) {
    this.serviceGroups.push({
      ...serviceGroup,
      services: [],
      processors: 0,
      problems: 0,
      resolvedProblems: 0,
    });
  },
  getProblems: function () {
    return this.problems;
  },
  refreshServices: function () {
    this.resetServices();
    refreshServicesKafka();
  },
  refreshServicesSoft: function () {
    refreshServicesKafka();
  },
  newService: function (service) {
    const { serviceId, serviceGroupId, version, port } = service;
    const serviceGroup = this.serviceGroups.find(
      (group) => group.id === serviceGroupId
    );
    if (!serviceGroup) {
      console.log(
        `Service ${serviceId} belongs to unknown service group ${serviceGroupId}`
      );
      return;
    }
    if (!serviceId) {
      console.log(`Can't register service with no id`);
      return;
    }
    const existedService = serviceGroup.services.find(
      (service) => service.id === serviceId
    );
    if (existedService) {
      console.log(`Service ${serviceId} already exists`);
      Object.assign(existedService, service);
    } else {
      console.log(
        `Service ${serviceId} added to service group ${serviceGroupId}`
      );
      serviceGroup.services.push({
        id: serviceId,
        serviceGroupId,
        version: version,
        port: port,
        problems: [],
      });
      serviceGroup.processors += 1;
    }
  },
  newError: async function (payload) {
    const { serviceId, serviceGroupId, error } = payload;
    const serviceGroup = this.serviceGroups.find(
      (group) => group.id === serviceGroupId
    );
    if (!serviceGroup) {
      console.log(
        `Service ${serviceId} belongs to unknown service group ${serviceGroupId}`
      );
      return;
    }
    if (!serviceId) {
      console.log(`Can't register service with no id`);
      return;
    }
    var serviceWithError = serviceGroup.services.find(
      (service) => service.id === serviceId
    );
    if (!serviceWithError) {
      console.log(`Service ${serviceId} does not exist`);
      console.log(
        `Service ${serviceId} added to service group ${serviceGroupId}`
      );
      serviceWithError = {
        id: serviceId,
        serviceGroupId,
        problems: [],
      };
      serviceGroup.services.push(serviceWithError);
      serviceGroup.processors += 1;
    }
    const errorHandled = await ErrorHandlingService.handleError(error);
    const errorId = Math.random().toString(36).substring(2, 15);
    error.id = errorId;
    error.serviceGroupId = serviceGroupId;
    if (errorHandled) error.resolved = true;

    // STORE ERROR
    this.problems.push(error);
    serviceGroup.problems += 1;
    serviceWithError.problems.push(error);
    if (errorHandled) {
      serviceGroup.resolvedProblems += 1;
    }
  },
  resolveError: function (errorId) {
    const error = this.problems.find((error) => error.id === errorId);
    if (error) {
      const serviceGroup = this.serviceGroups.find(
        (group) => group.id === error.serviceGroupId
      );
      if (serviceGroup && !error.resolved) serviceGroup.resolvedProblems += 1;
      error.resolved = true;
      return error;
    }
    return null;
  },
};

ServicesService.resetServices();

module.exports = {
  ServicesService,
};
