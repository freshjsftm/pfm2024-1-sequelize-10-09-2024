const { Op } = require("sequelize");
const { User } = require('../models');

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const newUser = await User.create(body);
    //console.log(newUser);
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
      //where: {'isMale': false},
      // where:{
      //   'id':{
      //     [Op.lt]:10
      //   }
      // },
      attributes: {
        exclude: ['password','createdAt','updatedAt']
      },
      // order: [['firstName', 'DESC'], ['id', 'DESC']]
    });
    res.status(200).send({ data: allUsers });
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
