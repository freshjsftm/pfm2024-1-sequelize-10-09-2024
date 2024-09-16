const { Router } = require('express');
const { checkUser } = require('../middlewares/user.mw');
const {
  createUser,
  findAllUsers,
  findUserByPk,
  deleteUserByPk,
  updateUserByPk,
} = require('../controllers/user.controller');

const userRouter = Router();

userRouter.post('/', createUser);
userRouter.get('/', findAllUsers);

userRouter
  .route('/:userId')
  .all(checkUser)
  .get(findUserByPk)
  .delete(deleteUserByPk)
  .patch(updateUserByPk);

module.exports = userRouter;
