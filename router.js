const { Router } = require('express');
const {
  createUser,
  findAllUsers,
  findUserByPk,
  deleteUserByPk,
  updateUserByPkInstance,
  updateUserByPkStatic
} = require('./controllers/user.controller');
const { createTask } = require('./controllers/task.controller');

const router = Router();

// http://localhost:3000/users/
router.post('/users', createUser);
router.get('/users', findAllUsers);

router.get('/users/:userId', findUserByPk);
router.delete('/users/:userId', deleteUserByPk);
// router.patch('/users/:userId', updateUserByPkInstance);
router.patch('/users/:userId', updateUserByPkStatic);


router.post('/users/:userId/tasks', createTask);


module.exports = router;
