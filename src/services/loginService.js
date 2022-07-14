const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const throwError = require('../utils/throwError');
const { User } = require('../database/models');

const loginService = {
  async exists(reqBody) {
    const { email, password } = reqBody;

    const user = await User.findOne({ 
      where: { email },
      raw: true,
    });

    if (!user || user.password !== password) throwError(400, 'Invalid fields');

    return user;
  },

  async verifyReqBody(reqBody) {
    const { email, password } = reqBody;
    if (!email || !password) throwError(400, 'Some required fields are missing');

    return true;
  },

  async generateToken(user) {
    const { password, ...newUser } = user;
    const token = jwt.sign({ data: newUser }, secret);

    return token;
  },
};

module.exports = loginService;