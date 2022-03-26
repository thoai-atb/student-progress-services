"use strict";

const { METADATA } = require("./metadata.mock");
const { STUDENTS } = require("./student-data.mock");
const { stringMatch } = require("../utils/string-matcher");

const browse = ({
  studentYear = "all",
  status = "all",
  studentId,
  studentName,
  page = 1,
  size = 10,
}) => {
  var data = STUDENTS;

  // FILTERING
  if (studentYear !== "all") {
    data = data.filter((s) => s.studentYear == studentYear);
  }
  if (status !== "all") {
    data = data.filter((s) => s.progressStatus.step.id === status);
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
    status: student.progressStatus.step.name,
  }));
  return {
    total: prePageingTotal,
    data,
  };
};

const getStudentData = (studentId) => {
  const student = STUDENTS.find((s) => s.id === studentId);
  if (!student) return null;
  const progressStatus = student.progressStatus;
  const progressSteps = progressStatus.progressData.map((step) => ({
    ...step,
    description: METADATA.steps.find((s) => s.id === step.id).description,
  }));
  return {
    id: student.id,
    name: student.name,
    studentYear: student.studentYear,
    status: student.progressStatus.step.name,
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
