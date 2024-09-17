const constants = require('../constants');
const { LIMIT } = constants;
module.exports.paginate = async (req, res, next) => {
  try {
    const {
      query: { page, amount },
    } = req;
    const limit = amount > LIMIT.MIN && amount <= LIMIT.MAX ? amount : LIMIT.MIN;
    const offset = page > 1 ? (page - 1) * limit : 0;
    req.pagination = {
      limit,
      offset,
    };
    next();
  } catch (error) {
    next(error);
  }
};
