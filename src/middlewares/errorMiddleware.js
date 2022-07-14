const errorMiddleware = (err, _req, res, _next) => {
  switch (err.message) {
    case 'Some required fields are missing':
    res.status(err.name).json({ message: err.message }); break;
    case 'Invalid fields':
    res.status(err.name).json({ message: err.message }); break;
    default:
      res.status(err.name).json(err.message); break;
  }
};

module.exports = errorMiddleware;