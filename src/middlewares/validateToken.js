const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.data;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateToken;