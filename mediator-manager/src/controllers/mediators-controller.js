const { MEDIATOR_LIST, MediatorsAPI } = require("../api/mediators-api");
const {
  getAllProcessors,
  getProcessorsByProgressCategory,
  PROCESSORS_MOCK,
} = require("../utils/mock/processors-mock");
const { mapper } = require("./progress-to-mediator-mapper");

const CONNECT_ERROR_MESSAGE = "Could not connect to mediator";

const MediatorController = {
  async getProgressCategories(req, res) {
    const data = [];
    try {
      for (const mediatorId of MEDIATOR_LIST) {
        const res = await MediatorsAPI.getMetadata(mediatorId);
        data.push(res.data);
      }
    } catch (error) {
      res.status(500).json({ message: CONNECT_ERROR_MESSAGE });
    } finally {
      res.json(data);
    }
  },
  async getStudentDistributions(req, res) {
    const data = [];
    const studentYear = req.params.studentYear;
    try {
      for (const mediatorId of MEDIATOR_LIST) {
        const res = await MediatorsAPI.getDistribution(mediatorId, studentYear);
        data.push(res.data);
      }
    } catch (error) {
      res.status(500).json({ message: CONNECT_ERROR_MESSAGE });
    } finally {
      res.json(data);
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
      const res = await MediatorsAPI.getStudents(mediatorId, {
        studentYear,
        status,
        studentId,
        studentName,
        page,
        size,
      });
      data = res.data;
    } catch (error) {
      res.status(500).json({ message: CONNECT_ERROR_MESSAGE });
    } finally {
      res.json(data);
    }
  },
  async getStudent(req, res) {
    const progressCategoryId = req.params.progressCategory;
    const studentId = req.params.studentId;
    var data = {};
    try {
      const mediatorId = mapper(progressCategoryId);
      const res = await MediatorsAPI.getStudent(mediatorId, studentId);
      data = res.data;
    } catch (error) {
      res.status(500).json({ message: CONNECT_ERROR_MESSAGE });
    } finally {
      res.json(data);
    }
  },
  async getProcessors(req, res) {
    var progressCategoryId = req.params.progressCategory;
    var data = [];
    if (progressCategoryId === "all") data = PROCESSORS_MOCK;
    else {
      const mediatorId = mapper(progressCategoryId);
      try {
        const res = await MediatorsAPI.getProcessors(mediatorId);
        const list = res.data;
        data = PROCESSORS_MOCK.filter(
          (processor) => list.includes(processor.id)
        );
      } catch (error) {
        res.status(500).json({ message: CONNECT_ERROR_MESSAGE });
      }
    }
    res.json(data);
  },
};

module.exports = { MediatorController };
