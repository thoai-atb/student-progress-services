const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: "http://localhost:8094/service-manager",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

const ServicesAPI = {
  getServiceGroups: () => {
    return axiosInstance.get("/api/service-groups");
  }
}

module.exports = {
  ServicesAPI
}