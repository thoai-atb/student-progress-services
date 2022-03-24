const STEP_STATUS = {
  DONE: "done",
  CURRENT: "current",
  FUTURE: "future",
};

const STEP_CERTIFICATES_CURRENT = {
  id: "certificates",
  name: "Certificates",
  status: STEP_STATUS.CURRENT,
  statusName: "Certificate(s) missing",
  progress: 75,
  info: [
    {
      title: "Certificates",
      data: {
        English: "IELTS 6.5",
        Military: "Finished",
      },
    },
    {
      title: "Annual Political Education",
      data: {
        ĐK: "Finished",
        GK1: "Finished",
        GK2: "Missing",
        CK: "Missing",
      },
    },
  ],
};

const STEP_CERTIFICATE_DONE = {
  id: "certificates",
  name: "Certificates",
  status: STEP_STATUS.DONE,
  statusName: "Done",
  progress: 100,
  info: [
    {
      title: "Certificates",
      data: {
        English: "IELTS 6.5",
        Military: "Finished",
      },
    },
    {
      title: "Annual Political Education",
      data: {
        ĐK: "Finished",
        GK1: "Finished",
        GK2: "Finished",
        CK: "Finished",
      },
    },
  ],
}

const STEP_CERTIFICATE_FUTURE = {
  id: "certificates",
  name: "Certificates",
  status: STEP_STATUS.FUTURE,
  statusName: "Future",
  progress: 0,
  info: [
    {
      title: "Certificates",
      data: {
        English: "Missing",
        Military: "Missing",
      },
    },  
    {
      title: "Annual Political Education",
      data: {
        ĐK: "Missing",
        GK1: "Missing",
        GK2: "Missing",
        CK: "Missing",
      },
    },
  ],
}

module.exports = {
  STEP_CERTIFICATES_CURRENT,
  STEP_CERTIFICATE_DONE,
  STEP_CERTIFICATE_FUTURE,
};
