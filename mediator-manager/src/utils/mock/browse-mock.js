const { snakeToTitleCase } = require("../case-converter");
const { stringMatch } = require("../string-matcher");
const { PROGRESS_CATEGORIES } = require("./metadata-mock");
const {
  STEP_CERTIFICATES_CURRENT,
  STEP_CERTIFICATE_DONE,
  STEP_CERTIFICATE_FUTURE,
} = require("./step-data-mock");

const STEP_STATUS = {
  DONE: "done",
  CURRENT: "current",
  FUTURE: "future",
};

const generateStepData = (stepId, stepName, status) => {
  if (stepId === "certificates") {
    if (status === STEP_STATUS.CURRENT) return STEP_CERTIFICATES_CURRENT;
    if (status === STEP_STATUS.DONE) return STEP_CERTIFICATE_DONE;
    return STEP_CERTIFICATE_FUTURE;
  }
  return {
    id: stepId,
    name: stepName,
    status,
    statusName: snakeToTitleCase(status),
  };
};

const generateProgressStatuses = () => {
  return PROGRESS_CATEGORIES.map((c) => {
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
      progressData.push(generateStepData(steps[i].id, steps[i].name, status));
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
  });
};

const generateStudents = () => {
  const students = [];
  const year = 17;
  const studentPerYear = 20;
  const years = 6;
  for (let i = 0; i < studentPerYear * years; i++) {
    let y = year + Math.floor(i / studentPerYear);
    let tail = ("000" + (i + 1)).slice(-3);

    // random word with two letter from i and year A to Z
    let nameLetters =
      String.fromCharCode(97 + (i % 26)).toUpperCase() + (i + 1);

    const student = {
      id: "ITITIU" + y + tail,
      name: "Nguyen Van " + nameLetters,
      studentYear: y,
      progressStatuses: generateProgressStatuses(),
    };
    students.push(student);
  }
  return students;
};

const students = generateStudents();

const browse = ({
  progressCategoryId,
  studentYearId,
  statusId,
  studentId,
  studentName,
  page = 1,
  size = 10,
}) => {
  const progressCategory = progressCategoryId;
  if (!progressCategory) return [];

  const studentYear = studentYearId || "all";
  const status = statusId || "all";
  var data = students;

  // FILTERING
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
  if (studentId) {
    data = data.filter((s) => stringMatch(studentId, s.id));
  }
  if (studentName) {
    data = data.filter((s) => stringMatch(studentName, s.name));
  }
  const prePageingTotal = data.length;

  // PAGING
  const start = (page - 1) * size;
  const end = start + parseInt(size);
  data = data.slice(start, end);

  // MAPPING
  data = data.map((student) => ({
    id: student.id,
    name: student.name,
    studentYear: student.studentYear,
    status: student.progressStatuses.find(
      (status) => status.id === progressCategory
    ).step.name,
  }));
  return {
    total: prePageingTotal,
    data,
  };
};

const getStudentData = (studentId, progressCategoryId) => {
  const student = students.find((s) => s.id === studentId);
  if (!student) return null;
  const progressStatus = student.progressStatuses.find(
    (status) => status.id === progressCategoryId
  );
  const progressSteps = progressStatus.progressData.map((step) => ({
    ...step,
    description: PROGRESS_CATEGORIES.find(
      (c) => c.id === progressCategoryId
    ).steps.find((s) => s.id === step.id).description,
  }));
  return {
    id: student.id,
    name: student.name,
    studentYear: student.studentYear,
    status: student.progressStatuses.find(
      (status) => status.id === progressCategoryId
    ).step.name,
    progressStatus: {
      ...progressStatus,
      progressData: progressSteps,
    },
  };
};

module.exports = {
  browse,
  getStudentData,
};
