const { Task, User } = require('../models');

module.exports.createTask = async (req, res, next) => {
  try {
    const {
      body,
      params: { userId },
    } = req;
    //перевірити користувача!!!
    const newTask = await Task.create({ ...body, userId: userId });
    res.status(201).send({ data: newTask });
  } catch (error) {
    next(error);
  }
};
