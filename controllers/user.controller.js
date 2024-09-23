const { Op } = require('sequelize');
const createError = require('http-errors');
const _ = require('lodash');
const { User } = require('../models');
const attrs = [
  'firstName',
  'lastName',
  'email',
  'password',
  'birthday',
  'isMale',
  'avatar'
];

module.exports.createUser = async (req, res, next) => {
  try {
    const { body, file } = req;
    let values = _.pick(body, attrs);
    if(file){
      values = { ...values, avatar: file.filename };
    }
    const newUser = await User.create(values);
    if (!newUser) {
      return next(createError(400, 'Fix data'));
    }
    newUser.dataValues.password = undefined;
    res.status(201).send({ data: newUser });
  } catch (error) {
    next(error);
  }
};

module.exports.findAllUsers = async (req, res, next) => {
  try {
    const { pagination } = req;
    const allUsers = await User.findAll({
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
      ...pagination,
    });
    res.status(200).send({ data: allUsers });
  } catch (error) {
    next(error);
  }
};

module.exports.findUserByPk = async (req, res, next) => {
  try {
    const { userInstance } = req;
    userInstance.dataValues.password = undefined;
    res.status(200).send({ data: userInstance });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUserByPk = async (req, res, next) => {
  try {
    const { userInstance } = req;
    userInstance.dataValues.password = undefined;
    const result = await userInstance.destroy();
    res.status(200).send({ data: userInstance });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserByPk = async (req, res, next) => {
  try {
    const { userInstance, body, file } = req;
    let values = _.pick(body, attrs);
    if(file){
      values = { ...values, avatar: file.filename };
    }
    const updatedUser = await userInstance.update(values);
    if (!updatedUser) {
      return next(createError(400, 'Fix data'));
    }
    updatedUser.dataValues.password = undefined;
    res.status(200).send({ data: updatedUser });
  } catch (error) {
    next(error);
  }
};


/// -----  not use
module.exports.updateUserByPkStatic = async (req, res, next) => {
  try {
    const {
      params: { userId },
      body,
    } = req;
    const values = _.pick(body, attrs);
    const [, [updatedUser]] = await User.update(values, {
      where: { id: userId },
      returning: true,
    });
    if (!updatedUser) {
      return next(createError(400, 'Fix data'));
    }
    updatedUser.dataValues.password = undefined;
    res.status(200).send({ data: updatedUser });
  } catch (error) {
    next(error);
  }
};
