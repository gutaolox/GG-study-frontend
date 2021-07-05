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

export const initClass = (socket, classroom, setToken) => {
  socket.emit('initClassroom', {
    idClass: classroom.idClass,
  });
  socket.on('classCreated', (data) => {
    setToken(data.connectToken);
  });
};

export const closeRoom = (socket, idClass, setCloseRoom) => {
  socket.emit('closeClassroom', {
    idClass,
  });
  socket.on('classClosed', () => {
    setCloseRoom(true);
  });
};
