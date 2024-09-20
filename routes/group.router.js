const { Router } = require('express');
const {
  createGroup,
  getAllGroups,
  getGroup,
  addUserToGroup,
  updateGroup,
} = require('../controllers/group.controller');
const { checkGroup } = require('../middlewares/group.mw');
const { singleUpload } = require('../middlewares/upload.mw');

const groupRouter = Router();
// '/users/:userId/groups'
groupRouter.post('/', singleUpload('image'), createGroup);
groupRouter.get('/', getAllGroups);

// '/users/:userId/groups/:groupId'
groupRouter.get('/:groupId', getGroup);

//додати нового користувача в групу
//перевіряємо групу на наявність незалежно від належності цієї групи до поточного користувача
groupRouter.post('/:groupId', checkGroup, addUserToGroup);
groupRouter.patch('/:groupId', checkGroup, singleUpload('image'), updateGroup);

module.exports = groupRouter;
