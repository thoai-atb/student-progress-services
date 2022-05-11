const toConfirms = [];

const LecturerService = {
  getToConfirms: () => {
    return toConfirms;
  },

  addToConfirm: (toConfirm) => {
    toConfirms.push(toConfirm);
  },

  confirm: (registrationId) => {
    const toConfirm = toConfirms.find((toConfirm) => toConfirm.registrationId === parseInt(registrationId));
    if (!toConfirm) throw new Error(`Registration with ID ${registrationId} was not found`);
    const index = toConfirms.indexOf(toConfirm);
    toConfirms.splice(index, 1);
    return toConfirm;
  }
};

module.exports = {
  LecturerService,
};
