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
      throw new Error('task not found');
    }
    req.taskInstance = taskInstance;
    next();
  } catch (error) {
    next(error);
  }
};
