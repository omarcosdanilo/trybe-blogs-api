const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateToken;