export const getNotificationsByClass = (
  socket,
  idClass,
  setterNotifications,
) => {
  socket.emit('findClassNotification', {
    idClass: idClass,
  });
  socket.on('notifications', (data) => {
    console.log(data);
    setterNotifications(data);
  });
};
export const releaseExercisesByClass = (socket, idClass) => {
  socket.emit('releaseExercises', {
    idClass,
    orders: ['60ff4f5e15078964708d6cc1'],
  });
};

// export const getNotificationsByClass = (
//   socket,
//   classId,
//   setterNotifications,
// ) => {
//   setterNotifications([
//     {
//       _id: '60ff4f5e15078964708d6cc1',
//       order: 1,
//       options: ['1', '2', '3', '4'],
//       text: 'Pergunta 1: Qual o valor de x++? Sendo x=1',
//       answer: '2',
//       classRoom: '60dd02372edf90240c54dde6',
//       timeReleased: 1627344977484,
//       type: 'question',
//     },
//   ]);
// };

export const answerNotification = (
  socket,
  classId,
  userId,
  order,
  answer,
  setterNotifications,
) => {
  console.log('order', order);
  socket.emit('nextExercises', {
    idClass: classId,
    nextOrder: order + 1,
    studentId: userId,
    answer: answer,
  });

  socket.once('showExercise', (data) => {
    setterNotifications(data);
  });

  // order = order === 5 ? 1 : order;
  // setterNotifications(
  //   [
  //     {
  //       _id: '60ff4f5e15078964708d6cc1',
  //       order: 1,
  //       options: ['1', '2', '3', '4'],
  //       text: 'Pergunta 1: Qual o valor de x++? Sendo x=1',
  //       answer: '2',
  //       classRoom: '60dd02372edf90240c54dde6',
  //       timeReleased: 1627344977484,
  //       type: 'question',
  //     },
  //     {
  //       _id: '60ff4f5e15078964708d6c32',
  //       order: 2,
  //       options: ['1', '2', '3', '4'],
  //       text: 'Pergunta 2: Qual o valor de x+=3? Sendo x=1',
  //       answer: '4',
  //       classRoom: '60dd02372edf90240c54dde6',
  //       timeReleased: 1627344977484,
  //       type: 'question',
  //     },
  //     {
  //       _id: '60ff4f5e15078964234d6cc1',
  //       order: 3,
  //       options: ['1', '2', '3', '4'],
  //       text: 'Pergunta 3: Qual o valor de x? Sendo x=1',
  //       answer: '1',
  //       classRoom: '60dd02372edf90240c54dde6',
  //       timeReleased: 1627344977484,
  //       type: 'question',
  //     },
  //     {
  //       _id: '60ff4f5e15078964234327c1',
  //       order: 4,
  //       options: ['1', '2', '3', '4'],
  //       text: 'Pergunta 4: Qual o valor de x+=1? Sendo x=1',
  //       answer: '2',
  //       classRoom: '60dd02372edf90240c54dde6',
  //       timeReleased: 1627344977484,
  //       type: 'question',
  //     },
  //   ].filter((x) => x.order === order || x.type !== 'question'),
  // );
};

export const getQuestionMetricsByClass = (
  socket,
  classId,
  setterMetrics,
  setterLoading,
) => {
  setTimeout(() => {
    setterMetrics([
      {
        _id: 'hhheigne8',
        title: 'Exercicio 1',
        toDo: 2,
        doing: 5,
        done: 13,
        percentRight: '34%',
        participants: [
          {
            _id: 'flijerighen934245j',
            name: 'Renato',
            timeStarted: 1627776241801,
          },
          {
            _id: 'flijeri98hfh2w3f44',
            name: 'Thiago',
            timeStarted: 1627775241801,
          },
          {
            _id: 'fli2342rdghen93424',
            name: 'Josefina',
            timeStarted: 1627776141801,
          },
        ],
      },
      {
        _id: 'h7674he8',
        title: 'Exercicio 2',
        toDo: 10,
        doing: 3,
        done: 7,
        percentRight: '84%',
        participants: [
          {
            _id: 'flijerighen934245j',
            name: 'Renato',
            timeStarted: 1627759372821,
          },
          {
            _id: 'flijeri98hfh2w3f44',
            name: 'Thiago',
            timeStarted: 1627344987484,
          },
          {
            _id: 'fli2342rdghen93424',
            name: 'Josefina',
            timeStarted: 1627345077484,
          },
        ],
      },
      {
        _id: 'hhh65y523rne8',
        title: 'Exercicio 3',
        toDo: 12,
        doing: 5,
        done: 7,
        percentRight: '70%',
        participants: [
          {
            _id: 'flijerighen934245j',
            name: 'Renato',
            timeStarted: 1627759372821,
          },
          {
            _id: 'flijeri98hfh2w3f44',
            name: 'Thiago',
            timeStarted: 1627344987484,
          },
          {
            _id: 'fli2342rdghen93424',
            name: 'Josefina',
            timeStarted: 1627345077484,
          },
        ],
      },
    ]);
    setterLoading(false);
  }, 3000);
};
