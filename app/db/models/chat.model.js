const { STRING, DATE, NOW } = require('sequelize');
const database = require('../');

const Chat = database.define('Chat', {
  user: {
    type: STRING,
  },
  created: {
    type: DATE,
    defaultValue: NOW,
  },
  body: {
    type: STRING,
  },
});

module.exports = Chat;
