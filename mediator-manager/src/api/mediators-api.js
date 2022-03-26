const axios = require("axios");

const createAxios = (url) => {
  return axios.create({
    baseURL: url,
    timeout: 3000,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

const generalMediatorAxios = createAxios("http://localhost:8091");
const semesterMediatorAxios = createAxios("http://localhost:8092");

const MEDIATOR_LIST = [
  "general", // general mediator
  "semester", // semester mediator
];

const mediators = {
  general: generalMediatorAxios,
  semester: semesterMediatorAxios,
};

const MediatorsAPI = {
  getMetadata: (mediatorId) => {
    return mediators[mediatorId].get("/api/metadata");
  },
  getDistribution: (mediatorId, studentYear) => {
    return mediators[mediatorId].get(`/api/distribution/${studentYear}`);
  },
  getProcessors: (mediatorId) => {
    return mediators[mediatorId].get("/api/processors");
  },
  getStudents: (mediatorId, params) => {
    return mediators[mediatorId].get("/api/students", { params });
  },
  getStudent: (mediatorId, studentId) => {
    return mediators[mediatorId].get(`/api/student/${studentId}`);
  },
};

module.exports = {
  MediatorsAPI,
  MEDIATOR_LIST,
};
