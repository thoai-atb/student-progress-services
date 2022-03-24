const { PROGRESS_CATEGORIES } = require("./metadata-mock");

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

const generalPercentages = (studentYearId) => {
  // LAST PERCENTAGE IS NOT DECLARED AS IT WILL BE CALCULATED
  switch (studentYearId) {
    case "22":
      return [0.8, 0.15, 0.0, 0.0, 0.0, 0.0, 0.0];
    case "21":
      return [0.0, 0.0, 0.65, 0.3, 0.0, 0.0, 0.0];
    case "20":
      return [0.0, 0.0, 0.2, 0.75, 0.0, 0.0, 0.0];
    case "19":
      return [0.0, 0.0, 0.0, 0.85, 0.1, 0.0, 0.0];
    case "18":
      return [0.0, 0.0, 0.0, 0.23, 0.6, 0.1, 0.05];
    case "17":
      return [0.0, 0.0, 0.0, 0.0, 0.1, 0.1, 0.7];
    default:
      return [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.95];
  }
};

const semesterPercentages = (studentYearId) => {
  // LAST PERCENTAGE IS NOT DECLARED AS IT WILL BE CALCULATED
  switch (studentYearId) {
    case "22":
      return [0.0, 0.0, 0.0, 0.0, 0.0, 0.1, 0.85];
    case "21":
      return [0.0, 0.0, 0.0, 0.0, 0.0, 0.1, 0.7];
    case "20":
      return [0.0, 0.0, 0.0, 0.0, 0.0, 0.2, 0.75];
    case "19":
      return [0.0, 0.0, 0.0, 0.0, 0.0, 0.1, 0.8];
    case "18":
      return [0.0, 0.0, 0.0, 0.0, 0.0, 0.25, 0.7];
    case "17":
      return [0.0, 0.0, 0.0, 0.0, 0.0, 0.1, 0.8];
    default:
      return [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.95];
  }
};

const getPercentages = (progressCategoryId, studentYearId) => {
  switch (progressCategoryId) {
    case "general":
      return generalPercentages(studentYearId);
    case "semester":
      return semesterPercentages(studentYearId);
    default:
      return [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.95];
  }
};

const generateStudentsData = (progressCategoryId, studentYearId) => {
  const steps = PROGRESS_CATEGORIES.find(
    (c) => c.id === progressCategoryId
  ).steps;
  const total = TOTAL_STUDENTS[studentYearId];
  const percentages = getPercentages(progressCategoryId, studentYearId);
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
    progressCategoryId,
    studentYearId,
    data: studentsData,
  };
};

module.exports = {
  generateStudentsData,
};
