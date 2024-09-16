const { Router } = require('express');
const {
  createUser,
  findAllUsers,
  findUserByPk,
  deleteUserByPk,
  updateUserByPk,
} = require('./controllers/user.controller');
const { createTask, findAllTasks, updateTask } = require('./controllers/task.controller');
const { checkUser } = require('./middlewares/user.mw');

const router = Router();

router.post('/users', createUser);
router.get('/users', findAllUsers);

// router.get('/users/:userId', checkUser, findUserByPk);
// router.delete('/users/:userId', checkUser, deleteUserByPk);
// router.patch('/users/:userId', checkUser, updateUserByPk);
router
  .route('/users/:userId')
  .all(checkUser)
  .get(findUserByPk)
  .delete(deleteUserByPk)
  .patch(updateUserByPk);

router.post('/users/:userId/tasks', checkUser, createTask);
router.get('/users/:userId/tasks', checkUser, findAllTasks);
//router.get('/users/:userId/tasks/:taskId', checkUser, findTask);

router.patch('/users/:userId/tasks/:taskId', checkUser, updateTask);

module.exports = router;
