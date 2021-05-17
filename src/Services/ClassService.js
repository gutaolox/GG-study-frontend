export const getAllClass = (socket, classSetter) => {
  socket.emit('findAllClassRoom');
  socket.once('getClassRoom', (data) => {
    classSetter(data);
  });
};

export const addStudent = (socket, idClass, idStudent, tokenSetter) => {
  socket.emit('addStudent', {
    idClass,
    idStudent,
  });
  socket.once('connectToken', (data) => {
    tokenSetter(data.videoToken);
  });
};
