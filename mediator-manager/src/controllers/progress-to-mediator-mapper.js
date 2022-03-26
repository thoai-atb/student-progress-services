const MAPPER = {
  general: "general",
  semester: "semester",
  english: "english",
};

const mapper = (progressCategoryId) => {
  return MAPPER[progressCategoryId] || progressCategoryId;
};

module.exports = {
  mapper,
};
