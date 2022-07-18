const errorMiddleware = (err, _req, res, _next) => {
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  res.status(err.name).json({ message: err.message });
};

module.exports = errorMiddleware;