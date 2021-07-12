import { customAxios } from '../Utils/customAxios';

export const getAllProfessorClasses = (socket, idProfessor, classSetter) => {
  socket.emit('findAllClassRoomByProfessor', idProfessor);
  socket.once('getClassRoomByProfessor', (data) => {
    classSetter(data);
  });
};

export const getAllStudentClasses = (socket, idStudent, classSetter) => {
  socket.emit('findAllClassRoomByStudent', idStudent);
  socket.once('getClassRoomByStudent', (data) => {
    classSetter(data);
  });
};

export const addStudent = (
  socket,
  idClass,
  idStudent,
  tokenSetter,
  setInitialPage,
  setTotalPage,
) => {
  socket.emit('addStudent', {
    idClass,
    idStudent,
  });
  socket.once('connectToken', (data) => {
    console.log(data);
    tokenSetter(data.videoToken);
    setInitialPage(data.page);
    setTotalPage(data.totalPages);
  });
};

export const initClass = (
  socket,
  classroom,
  setToken,
  setInitialPage,
  setTotalPage,
) => {
  socket.emit('initClassroom', {
    idClass: classroom.idClass,
  });
  socket.on('classCreated', (data) => {
    setToken(data.connectToken);
    setInitialPage(data.page);
    setTotalPage(data.totalPages);
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

export const getSlide = (classId, page) => {
  return customAxios().get(`/presentations/${classId}/${page}`);
};

export const updatePage = (socket, idClass, page) => {
  socket.emit('updatePage', {
    idClass,
    newPage: page,
  });
};

export const pageListener = (socket, setNewPage) => {
  socket.on('newPage', (data) => {
    console.log(data);
    setNewPage(data.newPage);
  });
};
