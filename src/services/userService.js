const throwError = require('../utils/throwError');
const { User } = require('../database/models');

const userService = {
  async create(payload) {
    const user = await User.create(payload);
    const newUser = user.toJSON();
    return newUser;
  },

  async delete(id) {
    await User.destroy({ where: { id } });
  },

  async exists(email) {
    const user = await User.findOne({ 
      where: { email },
      raw: true,
    });

    if (user) throwError(409, 'User already registered');
  },
  async validateDisplayName(name) {
    if (name.length < 8) throwError(400, '"displayName" length must be at least 8 characters long');

    return true;
  },

  async validateEmail(email) {
    const pattern = /\S+@\S+\.\S+/;
    const test = pattern.test(email);

    if (!test) throwError(400, '"email" must be a valid email');
  },

  async validatePassword(password) {
    if (password.length < 6) {
      throwError(400, '"password" length must be at least 6 characters long');
    }
  },

  async getAll() {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      raw: true,
    });

    return users;
  },

  async getById(id) {
    const user = await User.findOne({ 
      where: { id },
      attributes: { exclude: ['password'] },
      raw: true,
    });

    if (!user) throwError(404, 'User does not exist');

    return user;
  },
};

module.exports = userService;