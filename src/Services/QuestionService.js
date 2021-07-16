export const createQuestion = (socket, question) => {
  socket.emit('createQuestion', question);
};

export const questionListen = (socket, recieveCallback) => {
  socket.off('question');
  socket.on('question', recieveCallback);
};

export const listenQuestion = (socket, question) => {
  createQuestion(socket, question);
};

export const getQuestions = (socket, idClass, setCallback) => {
  socket.emit('findAllQuestions', idClass);
  socket.on('questions', (data) => {
    setCallback(data);
  });
};
