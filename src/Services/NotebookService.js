export const getNotificationsByClass = (
  socket,
  idClass,
  setterNotifications,
) => {
  socket.emit('findClassNotification', {
    idClass: idClass,
  });
  socket.once('notifications', (data) => {
    console.log(data);
    setterNotifications(data);
  });
};
