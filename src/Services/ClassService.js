export const getAllClass = (socket, classSetter) => {
  socket.emit('findAllClassRoom');
  socket.once('getClassRoom', (data) => {
    classSetter(data);
  });
};
