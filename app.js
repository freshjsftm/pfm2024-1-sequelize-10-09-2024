const express = require('express');
const router = require('./router');
const app = express();

app.use(express.json());

//router
app.use('/api', router)


//handlerError

module.exports = app;