import socketIOClient from 'socket.io-client';

export const customSocket = () => {
  const socket = socketIOClient(
    `${process.env.REACT_APP_LINK}:${process.env.REACT_APP_PORT}`,
    {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: localStorage.getItem('token'),
          },
        },
      },
    },
  );

  return socket;
};
