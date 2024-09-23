const { Router } = require('express');
const {
  createUser,
  findAllUsers,
  findUserByPk,
  deleteUserByPk,
  updateUserByPk,
} = require('../controllers/user.controller');
const { checkUser } = require('../middlewares/user.mw');
const { paginate } = require('../middlewares/paginate.mw');
const { singleUpload } = require('../middlewares/upload.mw');

const userRouter = Router();

userRouter.post('/', singleUpload('avatar'), createUser);
userRouter.get('/',paginate, findAllUsers);

userRouter
  .route('/:userId')
  .all(checkUser)
  .get(findUserByPk)
  .delete(deleteUserByPk)
  .patch(singleUpload('avatar'), updateUserByPk);

module.exports = userRouter;
