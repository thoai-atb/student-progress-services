const { snakeToTitleCase } = require("../utils/case-converter");
const { STEPS, METADATA } = require("./metadata.mock");
const { STEP_ITEMS } = require("./step-items.mock");

const STEP_STATUS = {
  DONE: "done",
  CURRENT: "current",
  FUTURE: "future",
};

const generateStepData = (stepId, stepName, status) => {
  var items = (() => {
    if (stepId === STEPS.FINISHED || stepId === STEPS.DROPPED) return undefined;
    const itemStatus = (() => {
      if (status === STEP_STATUS.DONE) return "done";
      return "not done";
    })();
    const items = STEP_ITEMS[stepId] || [];
    return items.map((item) => ({
      label: item,
      status: itemStatus,
      description: "Description",
    }));
  })();
  var progress = (() => {
    if (stepId === STEPS.FINISHED || stepId === STEPS.DROPPED) return undefined;
    if (items.length === 0) return undefined;
    return Math.round(
      (items.filter((item) => item.status === "done").length / items.length) *
        100
    );
  })();
  return {
    id: stepId,
    name: stepName,
    status,
    statusName: snakeToTitleCase(status),
    progress: progress,
    items: items,
  };
};

const generateProgressStatus = () => {
  const steps = METADATA.steps;
  const stepIndex = Math.floor(Math.random() * steps.length);
  const step = steps[stepIndex];
  const progressData = [];
  var stopIndex = stepIndex;
  if (step.id === STEPS.DROPPED)
    stopIndex = Math.floor(Math.random() * (stepIndex - 1));
  for (let i = 0; i < steps.length; i++) {
    var status = STEP_STATUS.FUTURE;
    if (i < stopIndex) status = STEP_STATUS.DONE;
    if (i == stepIndex) status = STEP_STATUS.CURRENT;
    progressData.push(generateStepData(steps[i].id, steps[i].name, status));
  }
  return {
    id: METADATA.id,
    name: METADATA.name,
    step: {
      id: step.id,
      name: step.name,
    },
    progressData,
  };
};

const generateStudents = () => {
  console.log("Generating students...");
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
      progressStatus: generateProgressStatus(),
    };
    students.push(student);
  }
  return students;
};

const STUDENTS = generateStudents();

module.exports = { STUDENTS, STEP_STATUS };
