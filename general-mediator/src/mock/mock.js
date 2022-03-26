const { METADATA } = require("./metadata.mock");
const { PROCESSOR_IDS } = require("./processors.mock");
const { generateStudentsDistribution } = require("./student-distribution.mock");

const mock = {
  getMetadata: () => {
    return METADATA;
  },
  getDistribution: (studentYear) => {
    return generateStudentsDistribution(studentYear);
  },
  getProcessors: () => {
    return PROCESSOR_IDS;
  },
};

module.exports = mock;
