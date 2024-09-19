const _ = require('lodash');
const createError = require('http-errors');
const attrs = ['name', 'imagePath', 'description'];

module.exports.createGroup = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    const values = _.pick(body, attrs);
    const newGroup = await userInstance.createGroup(values);
    if (!newGroup) {
      return next(createError(400, 'Fix group data '));
    }
    res.status(201).send({ data: newGroup });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllGroups = async (req, res, next) => {
  try {
    const { userInstance } = req;
    const groups = await userInstance.getGroups({
      through: {
        where: { groupId: 1 },
      },
    });
    res.status(200).send({ data: groups });
  } catch (error) {
    next(error);
  }
};


module.exports.getGroup = async (req, res, next) => {
  try {
    const { userInstance, params:{groupId} } = req;
    const [group] = await userInstance.getGroups({
      through: {
        where: { groupId:  groupId},
      },
    });
    if(!group){
      return next(createError(404, 'Not found'));
    }
    // group.dataValues.users_to_groups = undefined;
    res.status(200).send({ data: group });
  } catch (error) {
    next(error);
  }
};