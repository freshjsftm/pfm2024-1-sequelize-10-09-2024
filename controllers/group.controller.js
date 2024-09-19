const _ = require('lodash');
const attrs = ['name', 'imagePath', 'description'];

module.exports.createGroup = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    const values = _.pick(body, attrs);
    const newGroup = await userInstance.createGroup(values);
    res.status(201).send({ data: newGroup });
  } catch (error) {
    next(error);
  }
};
