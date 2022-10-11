const errorMiddleware = (err, _req, res, _next) => {
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  
  // Tratamento de erro 500
  if (err.status === 500) {
    console.error(err.message);
    return res.sendStatus(500);
  }

  res.status(err.name).json({ message: err.message });
};

module.exports = errorMiddleware;