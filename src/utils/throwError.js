const throwError = (status, message) => {
  const error = Error();
  error.name = status;
  error.message = message;
  throw error;
};

module.exports = throwError;