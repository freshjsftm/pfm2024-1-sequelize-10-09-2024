module.exports.handleErrors = (err, req, res, next) => {
  console.log('----in handlerError--->>>>>>', err.message, err.status);
  // if(){}
  const status =  err.status || 500;
  res.status(status).send({
    errors: [{detail:err.message || 'Server error'}]
  });
}