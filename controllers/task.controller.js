const { Task } = require('../models');

module.exports.createTask = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    const newTask = await userInstance.createTask(body);
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
    const {
      userInstance,
      params: { taskId },
      body,
    } = req;
    // const result = await userInstance.hasTasks(taskId);
    // console.log(result);
    const [taskInstance] = await userInstance.getTasks({
      where: { id: taskId },
    });
    if (!taskInstance) {
      throw new Error('task not found');
    }
    const task = await taskInstance.update(body);
    res.status(200).send({ data: task });
  } catch (error) {
    next(error);
  }
};
