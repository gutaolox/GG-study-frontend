export const createMessage = (socket, message) => {
  socket.emit('createMessage', message);
};

export const messageListen = (socket, recieveCallback) => {
  socket.off('message');
  socket.on('message', recieveCallback);
};

export const listenMessage = (socket, message) => {
  createMessage(socket, message);
};

export const getMessages = (socket, setCallback) => {
  socket.emit('findAllMessage');
  socket.on('messages', (data) => {
    setCallback(data);
  });
};
