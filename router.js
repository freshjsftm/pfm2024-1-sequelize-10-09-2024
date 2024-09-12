const { Router } = require('express');
const { createUser, findAllUsers } = require('./controllers/user.controller');

const router = Router();

// http://localhost:3000/users/
router.post('/users', createUser);
router.get('/users', findAllUsers);

module.exports = router;
