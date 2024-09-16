'use strict';
import _ from 'lodash';
const { User } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await User.findAll({
      attributes: ['id'],
    });
    // users = [{id:1},{id:2}]
    const tasks = users
      .map((user) => {
        return new Array(_.random(1, 10)).fill(null).map((e, i) => ({
          user_id: user.id,
          content: `content for task number(${i}) by user id = ${user.id}`,
          created_at: new Date(),
          updated_at: new Date(),
        }));
        // tasks = [
        //[{id:1,user_id:1, content:'content for task by user id = 1'}],
        //[{id:2,user_id:1,content:'content for task by user id = 1'}]
        //]
      })
      .flat(2);

    await queryInterface.bulkInsert('tasks', tasks);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', null);
  },
};
