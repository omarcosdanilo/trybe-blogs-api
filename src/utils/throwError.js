const throwError = (status, message) => {
  const error = new Error();
  error.name = status;
  error.message = message;
  throw error;
};

module.exports = throwError;