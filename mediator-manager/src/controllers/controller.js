"use strict";

const properties = require("../../package.json");
const { browse, getStudentData } = require("../utils/mock/browse-mock");
const {
  PROGRESS_CATEGORIES,
  STUDENT_YEARS,
} = require("../utils/mock/metadata-mock");
const {
  getProcessorsByProgressCategory,
  getAllProcessors,
} = require("../utils/mock/processors-mock");
const { generateStudentsData } = require("../utils/mock/students-data-mock");

var controllers = {
  about: (req, res) => {
    var aboutInfo = {
      name: properties.name,
      version: properties.version,
    };
    res.json(aboutInfo);
  },
  getProgressCategories(req, res) {
    res.json(PROGRESS_CATEGORIES);
  },
  getStudentYears(req, res) {
    var limit = req.query.limit || 100;
    const studentYears = STUDENT_YEARS.slice(0, limit);
    res.json(studentYears);
  },
  getStudentsData(req, res) {
    var data = [];
    var studentYearId = req.params.studentYearId;
    for (const category of PROGRESS_CATEGORIES) {
      data.push(generateStudentsData(category.id, studentYearId));
    }
    res.json(data);
  },
  getBrowseStudents(req, res) {
    var progressCategoryId = req.params.progressCategoryId;
    var studentYearId = req.query.studentYearId;
    var statusId = req.query.statusId;
    var studentId = req.query.studentId;
    var studentName = req.query.studentName;
    var page = req.query.page;
    var size = req.query.size;
    var data = browse({
      progressCategoryId,
      studentYearId,
      statusId,
      studentId,
      studentName,
      page,
      size,
    });
    res.json(data);
  },
  getStudentData(req, res) {
    var studentId = req.params.studentId;
    var progressCategoryId = req.query.progressCategoryId;
    var student = getStudentData(studentId, progressCategoryId);
    res.json(student);
  },
  getProcessors(req, res) {
    var progressCategoryId = req.params.progressCategoryId;
    if (progressCategoryId === "all") res.json(getAllProcessors());
    else res.json(getProcessorsByProgressCategory(progressCategoryId));
  },
};

module.exports = controllers;
