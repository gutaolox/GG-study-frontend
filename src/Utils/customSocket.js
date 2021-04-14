import { BACK_END_API_LINK } from '../Configs/backend';
import socketIOClient from 'socket.io-client';

export const customSocket = () => {
  const socket = socketIOClient(
    `${BACK_END_API_LINK.LINK}:${BACK_END_API_LINK.PORT}`,
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
