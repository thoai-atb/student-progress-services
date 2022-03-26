const { MEDIATOR_LIST, MediatorsAPI } = require("../api/mediators-api");
const { PROCESSORS_MOCK } = require("../utils/mock/processors-mock");
const { mapper } = require("./progress-to-mediator-mapper");

const CONNECT_ERROR_MESSAGE = "Could not connect to mediator";

const MediatorController = {
  async getProgressCategories(req, res) {
    const data = [];
    try {
      for (const mediatorId of MEDIATOR_LIST) {
        const res2 = await MediatorsAPI.getMetadata(mediatorId);
        data.push(res2.data);
      }
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: CONNECT_ERROR_MESSAGE });
    }
  },
  async getStudentDistributions(req, res) {
    const data = [];
    const studentYear = req.params.studentYear;
    try {
      for (const mediatorId of MEDIATOR_LIST) {
        const res2 = await MediatorsAPI.getDistribution(mediatorId, studentYear);
        data.push(res2.data);
      }
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: CONNECT_ERROR_MESSAGE });
    }
  },
  async getStudents(req, res) {
    const progressCategoryId = req.params.progressCategory;
    const {
      studentYear,
      status,
      studentId,
      studentName,
      page = 1,
      size = 10,
    } = req.query;
    var data = {};
    try {
      const mediatorId = mapper(progressCategoryId);
      const res2 = await MediatorsAPI.getStudents(mediatorId, {
        studentYear: studentYear || "all",
        status: status || "all",
        studentId: studentId || undefined,
        studentName: studentName || undefined,
        page: page || 1,
        size: size || 10,
      });
      data = res2.data;
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: CONNECT_ERROR_MESSAGE });
    }
  },
  async getStudent(req, res) {
    const progressCategoryId = req.params.progressCategory;
    const studentId = req.params.studentId;
    var data = {};
    try {
      const mediatorId = mapper(progressCategoryId);
      const res2 = await MediatorsAPI.getStudent(mediatorId, studentId);
      data = res2.data;
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async getProcessors(req, res) {
    var progressCategoryId = req.params.progressCategory;
    var data = [];
    try {
      if (progressCategoryId === "all") data = PROCESSORS_MOCK;
      else {
        const mediatorId = mapper(progressCategoryId);
        const res2 = await MediatorsAPI.getProcessors(mediatorId);
        const list = res2.data;
        data = PROCESSORS_MOCK.filter((processor) =>
          list.includes(processor.id)
        );
      }
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: CONNECT_ERROR_MESSAGE });
    }
  },
};

module.exports = { MediatorController };
