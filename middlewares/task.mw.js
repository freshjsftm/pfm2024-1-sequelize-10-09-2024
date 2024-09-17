const createError = require('http-errors');
module.exports.checkTask = async (req, res, next) => {
  try {
    const {
      userInstance,
      params: { taskId },
    } = req;
    const [taskInstance] = await userInstance.getTasks({
      where: { id: taskId },
    });
    if (!taskInstance) {
      return next(createError(404,'Task not found'));
    }
    req.taskInstance = taskInstance;
    next();
  } catch (error) {
    next(error);
  }
};
