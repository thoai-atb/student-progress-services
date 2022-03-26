const { METADATA } = require("./metadata.mock");

const TOTAL_STUDENTS = {
  22: 820,
  21: 782,
  20: 600,
  19: 643,
  18: 612,
  17: 634,
  16: 616,
  15: 615,
  14: 614,
  13: 613,
  12: 612,
  11: 611,
  10: 610,
};

const getPercentages = (studentYearId) => {
  // LAST PERCENTAGE IS NOT DECLARED AS IT WILL BE CALCULATED
  switch (studentYearId) {
    case "22":
      return [0.9, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
    case "21":
      return [0.0, 0.09, 0.15, 0.45, 0.27, 0.0, 0.0];
    case "20":
      return [0.0, 0.0, 0.0, 0.0, 0.05, 0.2, 0.7];
    case "19":
      return [0.0, 0.0, 0.0, 0.0, 0.0, 0.1, 0.8];
    case "18":
      return [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.91];
    case "17":
      return [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.92];
    default:
      return [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.93];
  }
};

const generateStudentsDistribution = (studentYearId) => {
  const steps = METADATA.steps;
  const total = TOTAL_STUDENTS[studentYearId];
  const percentages = getPercentages(studentYearId);
  const length = percentages.length;
  var runningTotal = 0;
  const studentsData = [];
  for (let i = 0; i < length; i++) {
    const percentage = percentages[i];
    const numberOfStudents = Math.floor(percentage * total);
    runningTotal += numberOfStudents;
    studentsData.push({
      id: steps[i].id,
      name: steps[i].name,
      students: numberOfStudents,
    });
  }
  studentsData.push({
    id: steps[length].id,
    name: steps[length].name,
    students: total - runningTotal,
  });
  return {
    progressCategoryId: METADATA.id,
    studentYearId,
    data: studentsData,
  };
};

module.exports = {
  generateStudentsDistribution,
};
