"use strict";

const properties = require("../../package.json");
const {
  PROGRESS_CATEGORIES,
  STUDENT_YEARS,
} = require("../utils/mock/static-mock");
const { generateStudentsData } = require("../utils/mock/dynamic-mock");

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
    res.json(STUDENT_YEARS);
  },
  async getStudentsData(req, res) {
    var data = [];
    var studentYearId = req.params.studentYearId;
    for (const category of PROGRESS_CATEGORIES) {
      data.push(generateStudentsData(category.id, studentYearId));
    }
    // await sleep(1000);
    // function sleep(ms) {
    //   return new Promise((resolve) => {
    //     setTimeout(resolve, ms);
    //   });
    // }
    res.json(data);
  },
};

module.exports = controllers;
