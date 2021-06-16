import socketIOClient from 'socket.io-client';

export const customSocket = () =>
  socketIOClient(`${process.env.REACT_APP_LINK}`, {
    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: localStorage.getItem('token'),
        },
      },
    },
  });
