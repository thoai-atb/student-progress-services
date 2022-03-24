const PROGRESS_CATEGORY_IDS = {
  GENERAL: "general",
  SEMESTER: "semester",
  SEMESTER_I_2022: "semester_i_2022",
  SEMESTER_II_2021: "semester_ii_2021",
  SEMESTER_I_2021: "semester_i_2021",
};

const SEMESTER_STEPS = [
  {
    id: "registration",
    name: "Registration",
    description: "Students have not registered for courses in this semester.",
  },
  {
    id: "confirmation",
    name: "Confirmation",
    description:
      "Students registered for courses in this semester and waiting for their course registration accepted.",
  },
  {
    id: "payment",
    name: "Payment",
    description: "Students have not paid for courses in this semester.",
  },
  {
    id: "midterm",
    name: "Midterm Exam",
    description: "Students studying for midterm exam.",
  },
  {
    id: "final",
    name: "Final Exam",
    description: "Students studying for final exam.",
  },
  {
    id: "waiting_results",
    name: "Waiting Results",
    description: "Students waiting their results in this semester.",
  },
  {
    id: "finished",
    name: "Finished",
    description: "Students finished this semester.",
  },
  {
    id: "dropped",
    name: "Dropped",
    description:
      "Students dropped this semester or not registering any courses.",
  },
];

const PROGRESS_CATEGORIES = [
  {
    id: PROGRESS_CATEGORY_IDS.GENERAL,
    name: "General",
    description:
      "General shows the progress of the students from start to finish in this university, including application, english progress, thesis and certificates.",
    steps: [
      {
        id: "application",
        name: "Application",
        description:
          "Students applied to study here and waiting for their application accepted.",
      },
      {
        id: "entry_english",
        name: "Entry English",
        description: "Students need to take the entry English test.",
      },
      {
        id: "ie_ae",
        name: "IE & AE",
        description: "Students studying intensive or academic English.",
      },
      {
        id: "acquiring_credits",
        name: "Acquiring Credits",
        description:
          "Students who finished English courses and accumulating credits to be ready for thesis.",
      },
      {
        id: "thesis",
        name: "Thesis",
        description: "Students working on their thesis",
      },
      {
        id: "certificates",
        name: "Certificates",
        description:
          "Students who have finished their thesis and are missing certifications including military, English, and annual political education.",
      },
      {
        id: "finished",
        name: "Finished",
        description:
          "Students who have finished their studies in this university and are ready to graduate.",
      },
      {
        id: "dropped",
        name: "Dropped",
        description:
          "Students who have cancel their studies in this university for any reason.",
      },
    ],
  },
  {
    id: PROGRESS_CATEGORY_IDS.SEMESTER,
    name: "Semester II 2022",
    description:
      "Semester II 2022 is a semester progress of students in this university, from course registration to examination and finishing the semester.",
    steps: SEMESTER_STEPS,
  },
  {
    id: PROGRESS_CATEGORY_IDS.SEMESTER_I_2022,
    name: "Semester I 2022",
    description:
      "Semester I 2022 is a semester progress of students in this university, from course registration to examination and finishing the semester.",
    steps: SEMESTER_STEPS,
  },
  {
    id: PROGRESS_CATEGORY_IDS.SEMESTER_II_2021,
    name: "Semester II 2021",
    description:
      "Semester II 2021 is a semester progress of students in this university, from course registration to examination and finishing the semester.",
    steps: SEMESTER_STEPS,
  },
  {
    id: PROGRESS_CATEGORY_IDS.SEMESTER_I_2021,
    name: "Semester I 2021",
    description:
      "Semester I 2021 is a semester progress of students in this university, from course registration to examination and finishing the semester.",
    steps: SEMESTER_STEPS,
  },
];

const STUDENT_YEARS = [
  {
    id: "22",
  },
  {
    id: "21",
  },
  {
    id: "20",
  },
  {
    id: "19",
  },
  {
    id: "18",
  },
  {
    id: "17",
  },
  {
    id: "16",
  },
  {
    id: "15",
  },
  {
    id: "14",
  },
  {
    id: "13",
  },
  {
    id: "12",
  },
  {
    id: "11",
  },
  {
    id: "10",
  },
];

module.exports = {
  PROGRESS_CATEGORIES,
  STUDENT_YEARS,
};
