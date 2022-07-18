const userService = require('../services/userService');
const loginService = require('../services/loginService');

const userController = {

  async create(req, res, next) {
    const { displayName, email, password } = req.body;
    try {
      await userService.validateDisplayName(displayName);
      await userService.validateEmail(email);
      await userService.validatePassword(password);
      await userService.exists(email);
      const newUser = await userService.create(req.body);
      const token = await loginService.generateToken(newUser);

      res.status(201).json({ token });
    } catch (error) {
      next(error);
    }
  },

  async getAll(req, res, next) {
    try {
      const users = await userService.getAll();

      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;

      const user = await userService.getById(id);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;