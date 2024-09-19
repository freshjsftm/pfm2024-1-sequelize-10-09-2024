const { Router } = require('express');
const {
  createGroup,
  getAllGroups,
  getGroup,
  addUserToGroup,
} = require('../controllers/group.controller');
const { checkGroup } = require('../middlewares/group.mw');

const groupRouter = Router();
// '/users/:userId/groups'
groupRouter.post('/', createGroup);
groupRouter.get('/', getAllGroups);

// '/users/:userId/groups/:groupId'
groupRouter.get('/:groupId', getGroup);

//додати нового користувача в групу
//перевіряємо групу на наявність незалежно від належності цієї групи до поточного користувача
groupRouter.post('/:groupId', checkGroup, addUserToGroup);


module.exports = groupRouter;
