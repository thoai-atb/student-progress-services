const { PROGRESS_CATEGORIES } = require("./metadata-mock");

const STEP_STATUS = {
  DONE: "done",
  CURRENT: "current",
  FUTURE: "future",
};

const generateStudents = () => {
  const students = [];
  const year = 17;
  for (let i = 0; i < 24; i++) {
    let y = year + Math.floor(i / 4);
    let tail = ("000" + i).slice(-3);
    let letter = String.fromCharCode(97 + (i % 26)).toUpperCase();
    const student = {
      id: "ITITIU" + y + tail,
      name: "Nguyen Van " + letter,
      studentYear: y,
      progressStatuses: PROGRESS_CATEGORIES.map((c) => {
        const steps = c.steps;
        const stepIndex = Math.floor(Math.random() * steps.length);
        const step = steps[stepIndex];
        const progressData = [];
        var stopIndex = stepIndex;
        if (step.id === "dropped")
          stopIndex = Math.floor(Math.random() * (stepIndex - 1));
        for (let i = 0; i < steps.length; i++) {
          var status = STEP_STATUS.FUTURE;
          if (i < stopIndex) status = STEP_STATUS.DONE;
          if (i == stepIndex) status = STEP_STATUS.CURRENT;
          progressData.push({
            id: steps[i].id,
            name: steps[i].name,
            status: status,
          });
        }
        return {
          id: c.id,
          name: c.name,
          step: {
            id: step.id,
            name: step.name,
          },
          progressData,
        };
      }),
    };
    students.push(student);
  }
  return students;
};

const students = generateStudents();

const browse = (progressCategoryOption, studentYearOption, statusOption) => {
  const progressCategory = progressCategoryOption || "all";
  const studentYear = studentYearOption || "all";
  const status = statusOption || "all";
  var data = students;
  if (studentYear !== "all") {
    data = data.filter((s) => s.studentYear == studentYear);
  }
  if (status !== "all") {
    data = data.filter(
      (s) =>
        s.progressStatuses.find((status) => status.id === progressCategory)
          ?.step.id === status
    );
  }
  data = data.map((student) => ({
    id: student.id,
    name: student.name,
    studentYear: student.studentYear,
    status: student.progressStatuses.find(
      (status) => status.id === progressCategory
    ).step.name,
  }));
  return data;
};

const getStudentData = (studentId, progressCategoryId) => {
  const student = students.find((s) => s.id === studentId);
  if (!student) return null;
  return {
    id: student.id,
    name: student.name,
    studentYear: student.studentYear,
    status: student.progressStatuses.find(
      (status) => status.id === progressCategoryId
    ).step.name,
    progressStatus: student.progressStatuses.find(
      (status) => status.id === progressCategoryId
    ),
  };
};

module.exports = {
  browse,
  getStudentData,
};
