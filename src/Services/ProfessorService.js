export const initClass = (socket, professorId, setToken) => {
  socket.emit('createClassRoom', {
    professorId,
  });
  socket.on('classCreated', (data) => {
    console.log(data);
    setToken(data.connectToken);
  });
};
