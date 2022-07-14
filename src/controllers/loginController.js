const loginService = require('../services/loginService');

const loginController = {

  async login(req, res, next) {
    try {
      await loginService.verifyReqBody(req.body);
      const user = await loginService.exists(req.body);
      const token = await loginService.generateToken(user);

      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = loginController;