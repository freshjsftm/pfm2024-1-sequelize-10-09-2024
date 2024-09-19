const { Router } = require('express');
const {
  createGroup,
  getAllGroups,
  getGroup,
} = require('../controllers/group.controller');
const groupRouter = Router();
// '/users/:userId/groups'
groupRouter.post('/', createGroup);
groupRouter.get('/', getAllGroups);

groupRouter.get('/:groupId', getGroup);

//дати нового користувача в групу
// groupRouter.post('/:groupId', getGroup);

module.exports = groupRouter;
