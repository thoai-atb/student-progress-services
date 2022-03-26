const MAPPER = {
  general: "general",
  semester: "semester",
};

const mapper = (progressCategoryId) => {
  return MAPPER[progressCategoryId] || progressCategoryId;
};

module.exports = {
  mapper,
};
