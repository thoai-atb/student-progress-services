const PROCESSORS_MOCK = [
  {
    id: "general_mediator",
    name: "General Mediator",
    isMediator: true,
    processors: 4,
    problems: 0,
  },
  {
    id: "semester_mediator",
    name: "Semester Mediator",
    isMediator: true,
    processors: 4,
    problems: 0,
  },
  {
    id: "student_services",
    name: "Student Services",
    processors: 2,
    problems: 0,
  },
  {
    id: "payment_services",
    name: "Payment Services",
    processors: 2,
    problems: 0,
  },
  {
    id: "course_services",
    name: "Course Services",
    processors: 2,
    problems: 0,
  },
  {
    id: "examination_services",
    name: "Examination Services",
    processors: 2,
    problems: 0,
  },
  {
    id: "certification_services",
    name: "Certification Services",
    processors: 2,
    problems: 0,
  },
  {
    id: "advisor_services",
    name: "Advisor Services",
    processors: 2,
    problems: 0,
  },
  {
    id: "mail_services",
    name: "Mail Services",
    processors: 2,
    problems: 0,
  },
  {
    id: "academic_schedule_services",
    name: "Academic Schedule",
    processors: 2,
    problems: 0,
  },
  {
    id: "retention_services",
    name: "Retention Services",
    processors: 2,
    problems: 0,
  },
  {
    id: "blackboard_services",
    name: "Blackboard Services",
    processors: 2,
    problems: 0,
  },
  {
    id: "edusoft_services",
    name: "Edusoft Services",
    processors: 2,
    problems: 0,
  },
  {
    id: "military_services",
    name: "Military Services",
    processors: 2,
    problems: 0,
  },
];

const GENERAL_RELATED_PROCESSOR_IDS = [
  "general_mediator",
  "student_services",
  "certification_services",
  "mail_services",
  "blackboard_services",
  "edusoft_services",
  "military_services",
  "payment_services",
];

const SEMESTER_RELATED_PROCESSOR_IDS = [
  "semester_mediator",
  "student_services",
  "payment_services",
  "course_services",
  "examination_services",
  "advisor_services",
  "mail_services",
  "academic_schedule_services",
  "retention_services",
  "blackboard_services",
  "edusoft_services",
];

const MEDIATOR_RELATED_PROCESSOR_MAPPING = {
  general: GENERAL_RELATED_PROCESSOR_IDS,
  semester: SEMESTER_RELATED_PROCESSOR_IDS,
};

const getAllProcessors = () => {
  return PROCESSORS_MOCK;
};

const getProcessorsByProgressCategory = (progressCategoryId) => {
  const processors = (
    MEDIATOR_RELATED_PROCESSOR_MAPPING[progressCategoryId] ||
    MEDIATOR_RELATED_PROCESSOR_MAPPING["semester"]
  ).map((id) => PROCESSORS_MOCK.find((p) => p.id === id));
  return processors;
};

module.exports = {
  getAllProcessors,
  getProcessorsByProgressCategory,
};
