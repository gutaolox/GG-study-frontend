export const initClass = (socket, classroom, setToken) => {
  socket.emit('createClassRoom', {
    professorId: classroom.professorId,
    name: classroom.className,
  });
  socket.on('classCreated', (data) => {
    setToken(data.connectToken);
  });
};
