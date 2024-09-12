const express = require('express');
const router = require('./router');
const app = express();

app.use(express.json());

//router
app.use('/', router);

//handlerError
app.use((err, req, res, next) => {
  console.log('----in handlerError--->>>>>>', err.message);
  res.status(501).send(err.message);
});

module.exports = app;
