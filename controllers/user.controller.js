const { Op } = require('sequelize');
const { User } = require('../models');

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const newUser = await User.create(body);
    console.log(newUser);
    if (newUser) {
      return res.status(201).send({ data: newUser });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.findAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.findAll({
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    });
    res.status(200).send({ data: allUsers });
  } catch (error) {
    next(error);
  }
};

module.exports.findUserByPk = async (req, res, next) => {
  try {
    const { userInstance } = req;
    userInstance.password = undefined;
    res.status(200).send({ data: userInstance });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUserByPk = async (req, res, next) => {
  try {
    const { userInstance } = req;
    const result = await userInstance.destroy();
    res.status(200).send({ data: userInstance });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserByPk = async (req, res, next) => {
  try {
    const { userInstance, body } = req;
    const updatedUser = await userInstance.update(body);
    res.status(200).send({ data: updatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserByPkStatic = async (req, res, next) => {
  try {
    const {
      params: { userId },
      body,
    } = req;
    const [, [updatedUser]] = await User.update(body, {
      where: { id: userId },
      returning: true,
    });
    res.status(200).send({ data: updatedUser });
  } catch (error) {
    next(error);
  }
};

// module.exports.nameMethod = async (req, res, next) => {
//   try {
//   } catch (error) {
//     next(error);
//   }
// };
