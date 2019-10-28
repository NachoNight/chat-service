const { STRING, DATE, NOW } = require('sequelize');
const database = require('../');

const ChatMessage = database.define('ChatMessage', {
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
  room: {
    type: STRING,
  },
});

module.exports = ChatMessage;
