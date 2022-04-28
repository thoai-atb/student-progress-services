const STEPS = {
  REGISTRATION: "registration",
  ADD_DROP: "add_drop",
  PAYMENT: "payment",
  MIDTERM: "midterm",
  FINAL: "final",
  WAITING_RESULTS: "waiting_results",
  FINISHED: "finished",
  DROPPED: "dropped",
};

const METADATA = {
  id: "semester",
  name: "Semester II 2022",
  description:
    "Semester II 2022 is a semester progress of students in this university, from course registration to examination and finishing the semester.",
  steps: [
    {
      id: STEPS.REGISTRATION,
      name: "Registration",
      description: "Students registrating for courses in this semester.",
    },
    {
      id: STEPS.ADD_DROP,
      name: "Add Drop",
      description:
        "Students have a chance to add or drop courses in this semester.",
    },
    {
      id: STEPS.PAYMENT,
      name: "Payment",
      description: "Students have not paid for courses in this semester.",
    },
    {
      id: STEPS.MIDTERM,
      name: "Midterm Exam",
      description: "Students studying for midterm exam.",
    },
    {
      id: STEPS.FINAL,
      name: "Final Exam",
      description: "Students studying for final exam.",
    },
    {
      id: STEPS.WAITING_RESULTS,
      name: "Waiting Results",
      description: "Students waiting their results in this semester.",
    },
    {
      id: STEPS.FINISHED,
      name: "Finished",
      description: "Students finished this semester.",
    },
    {
      id: STEPS.DROPPED,
      name: "Dropped",
      description:
        "Students dropped this semester or not registering any courses.",
    },
  ],
};

module.exports = { METADATA, STEPS };
