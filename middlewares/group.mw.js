const createError = require('http-errors');
const { Group } = require('../models');

//перевіряємо групу на наявність незалежно від належності цієї групи до поточного користувача
module.exports.checkGroup = async (req, res, next) => {
  try {
    const {
      params: { groupId },
    } = req;
    const groupInstance = await Group.findByPk(groupId);
    if (!groupInstance) {
      return next(createError(404, 'Not found'));
    }
    req.groupInstance = groupInstance;
    next();
  } catch (error) {
    next(error);
  }
};
