const _ = require('lodash');
const { Task } = require('../models');
const LimitTasksError = require('../errors/LimitTasksError');
const attrs = ['content', 'deadline', 'isDone'];

module.exports.createTask = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    const values = _.pick(body, attrs);
    const amount = await userInstance.countTasks();
    if(amount>=10){
      return next(new LimitTasksError('Error!!!!! limit tasks reached!!!!!!!!'))
    }
    const newTask = await userInstance.createTask(values);
    res.status(201).send({ data: newTask });
  } catch (error) {
    next(error);
  }
};

module.exports.findAllTasks = async (req, res, next) => {
  try {
    const { userInstance } = req;
    const tasks = await userInstance.getTasks();
    res.status(200).send({ data: tasks });
  } catch (error) {
    next(error);
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const { taskInstance, body } = req;
    const values = _.pick(body, attrs);
    const task = await taskInstance.update(values);
    res.status(200).send({ data: task });
  } catch (error) {
    next(error);
  }
};

module.exports.findTask = async (req, res, next) => {
  try {
    const { taskInstance } = req;
    res.status(200).send({ data: taskInstance });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTask = async (req, res, next) => {
  try {
    const { taskInstance } = req;
    await taskInstance.destroy();
    res.status(200).send({ data: taskInstance });
  } catch (error) {
    next(error);
  }
};
