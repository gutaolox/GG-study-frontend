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

export const getMessages = (socket, idClass, setCallback) => {
  socket.emit('findAllMessage', idClass);
  socket.on('messages', (data) => {
    setCallback(data);
  });
};
