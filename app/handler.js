const socketIO = require('socket.io');
const ChatMessage = require('./db/models/chat.model');

module.exports = (server) => {
  const io = socketIO(server);
  io.use((socket, next) => console.log(socket.request.headers));
  io.on('connection', (socket) => {
    const getMessages = async (room, global = false) => {
      const msg = await ChatMessage.findAll({ where: { room } });
      if (global) {
        io.sockets.in(room).emit('get_message', msg);
      } else {
        socket.emit('get_message', msg);
      }
    };
    socket.on('join_room', (room) => {
      socket.join(room);
      getMessages(room);
    });
    socket.on('send_message', async ({ user, body, room }) => {
      await ChatMessage.create({ user, body, room });
      getMessages(room, true);
    });
  });
};
