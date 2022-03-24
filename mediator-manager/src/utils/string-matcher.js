const stringMatch = (query, str) => {
  if (query === "") return true;
  if (str.toLowerCase().indexOf(query.toLowerCase()) !== -1) return true;
  return false;
};

module.exports = {
  stringMatch,
};
