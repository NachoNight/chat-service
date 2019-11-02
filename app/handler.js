const socketIO = require('socket.io');
const ChatMessage = require('./db/models/chat.model');

module.exports = (server) => {
  const io = socketIO(server);
  io.on('connection', (socket) => {
    const getMessages = async (room, global = false) => {
      const msg = await ChatMessage.findAll({ where: { room } });
      if (global) {
        io.sockets.in(room).emit('get_message', msg);
      } else {
        socket.emit('get_message', msg);
      }
    };
    socket.on('join_room', ({ name }) => {
      console.log(`Socket joining room ${name}`);
      socket.join(name);
      getMessages(name);
    });
    socket.on('send_message', async ({ user, body, room }) => {
      console.log('New message in room', room);
      await ChatMessage.create({ user, body, room });
      getMessages(room, true);
    });
  });
};
