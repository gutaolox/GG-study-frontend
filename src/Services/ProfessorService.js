export const initClass = (socket, professorId, setId, setToken) => {
  socket.emit('createClassRoom', {
    professorId,
  });
  socket.on('classCreated', (data) => {
    console.log(data);
    setId(data._id);
    setToken(data.connectToken);
  });
};
