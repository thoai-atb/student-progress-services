const { producer } = require("../kafka/kafka");

const ERROR_TOPICS = {
  COURSE_REGISTERED: "course-registered",
};

const ErrorHandlingService = {
  handleError: async function (error) {
    const { message, stack, eventMessage, eventTopic } = error;
    if (eventTopic === ERROR_TOPICS.COURSE_REGISTERED) {
      return await this.handleErrorCourseRegistered(
        message,
        stack,
        eventMessage,
        eventTopic
      );
    }
    return false;
  },

  handleErrorCourseRegistered: async function (
    message,
    stack,
    eventMessage,
    eventTopic
  ) {
    const studentId = eventMessage?.studentId;
    if (!studentId) return false;
    const fixedStudentId = studentId.toUpperCase().replace(/[-_ ]/g, "");
    if (studentId === fixedStudentId) return false;
    console.log(
      `Handling error: Changing student ID from ${studentId} to ${fixedStudentId}`
    );
    eventMessage.studentId = fixedStudentId;
    await producer.connect();
    await producer.send({
      topic: eventTopic,
      messages: [
        {
          value: JSON.stringify(eventMessage),
        },
      ],
    });
    return true;
  },
};

module.exports = {
  ErrorHandlingService,
};
