const ChatMessage = require('../db/models/chat.model');

module.exports = (socket) => {
  // Handle sockets here
  console.log('A user has connected.');
  socket.on('join_room', async ({ name }) => {
    const messages = await ChatMessage.findAll({ where: { room: name } });
    socket.join(name);
    socket.emit('get_messages', messages);
  });
  socket.on('send_message', async ({ user, body, room }) => {
    await ChatMessage.create({ user, body, room });
    const messages = await ChatMessage.findAll({ where: { room } });
    socket.emit('get_messages', messages);
  });
};
