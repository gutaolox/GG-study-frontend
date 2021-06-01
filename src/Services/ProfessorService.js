export const initClass = (socket, professorId, setToken) => {
  socket.emit('createClassRoom', {
    professorId,
  });
  socket.on('classCreated', (data) => {
    setToken(data.connectToken);
  });
};
