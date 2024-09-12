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
    console.log('---in controller---->>>>>>', error.message);
    next(error);
  }
};

module.exports.findAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.findAll({
      //where: {'isMale': false},
      // where:{
      //   'id':{
      //     [Op.lt]:10
      //   }
      // },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
      // order: [['firstName', 'DESC'], ['id', 'DESC']]
    });
    res.status(200).send({ data: allUsers });
  } catch (error) {
    next(error);
  }
};

module.exports.findUserByPk = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;
    const user = await User.findByPk(userId);
    res.status(200).send({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUserByPk = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;
    const userInstance = await User.findByPk(userId);
    const result = await userInstance.destroy();
    // const delUser = await User.destroy({
    //   where: { id: userId },
    // });  
    // delUser - кількість видалених рядків
    res.status(200).send({ data: userInstance });
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
