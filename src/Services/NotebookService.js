export const getNotificationsByClass = (
  socket,
  idClass,
  userId,
  setterNotifications,
  setIndex,
) => {
  socket.emit('addingStudentClassNotification', {
    idClass: idClass,
    studentId: userId,
  });
  socket.on('notifications', (data) => {
    setterNotifications(data.notifications);
    setIndex(data.lastOrder - 1);
  });
};
export const releaseExercisesByClass = (socket, idClass) => {
  socket.emit('releaseExercises', {
    idClass,
    orders: ['60ff4f5e15078964708d6cc1'],
  });
};

export const answerNotification = (
  socket,
  classId,
  userId,
  order,
  answer,
  setterNotifications,
) => {
  socket.emit('nextExercises', {
    idClass: classId,
    nextOrder: order + 1,
    studentId: userId,
    answer: answer,
  });
};

export const getQuestionMetricsByClass = (
  socket,
  classId,
  setterMetrics,
  setterLoading,
) => {
  socket.emit('getMetrics', {
    idClass: classId,
  });
  socket.on('metricsAnswer', (data) => {
    setterMetrics(data.metrics);
    setterLoading(false);
  });
  // setTimeout(() => {
  //   setterMetrics([
  //     {
  //       _id: 'hhheigne8',
  //       title: 'Exercicio 1',
  //       toDo: 2,
  //       doing: 5,
  //       done: 13,
  //       percentRight: '34%',
  //       participants: [
  //         {
  //           _id: 'flijerighen934245j',
  //           name: 'Renato',
  //           timeStarted: 1627776241801,
  //         },
  //         {
  //           _id: 'flijeri98hfh2w3f44',
  //           name: 'Thiago',
  //           timeStarted: 1627775241801,
  //         },
  //         {
  //           _id: 'fli2342rdghen93424',
  //           name: 'Josefina',
  //           timeStarted: 1627776141801,
  //         },
  //       ],
  //     },
  //     {
  //       _id: 'h7674he8',
  //       title: 'Exercicio 2',
  //       toDo: 10,
  //       doing: 3,
  //       done: 7,
  //       percentRight: '84%',
  //       participants: [
  //         {
  //           _id: 'flijerighen934245j',
  //           name: 'Renato',
  //           timeStarted: 1627759372821,
  //         },
  //         {
  //           _id: 'flijeri98hfh2w3f44',
  //           name: 'Thiago',
  //           timeStarted: 1627344987484,
  //         },
  //         {
  //           _id: 'fli2342rdghen93424',
  //           name: 'Josefina',
  //           timeStarted: 1627345077484,
  //         },
  //       ],
  //     },
  //     {
  //       _id: 'hhh65y523rne8',
  //       title: 'Exercicio 3',
  //       toDo: 12,
  //       doing: 5,
  //       done: 7,
  //       percentRight: '70%',
  //       participants: [
  //         {
  //           _id: 'flijerighen934245j',
  //           name: 'Renato',
  //           timeStarted: 1627759372821,
  //         },
  //         {
  //           _id: 'flijeri98hfh2w3f44',
  //           name: 'Thiago',
  //           timeStarted: 1627344987484,
  //         },
  //         {
  //           _id: 'fli2342rdghen93424',
  //           name: 'Josefina',
  //           timeStarted: 1627345077484,
  //         },
  //       ],
  //     },
  //   ]);
  //   setterLoading(false);
  // }, 3000);
};
