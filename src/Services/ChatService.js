export const createMessage = (socket, message) => {
  socket.emit('createChat', message);
};

export const messageListen = (socket, recieveCallback) => {
  socket.off('message');
  socket.on('message', recieveCallback);
};

export const listenMessage = (socket, message, recieveCallback) => {
  socket.off('message');
  socket.on('message', recieveCallback);
  createMessage(socket, message);
};

export const getMessages = (socket, setCallback) => {
  socket.emit('findAllChat');
  socket.on('messages', (data) => {
    console.log(data);
    setCallback(data);
  });
};
