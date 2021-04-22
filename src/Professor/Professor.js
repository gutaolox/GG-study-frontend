import React from 'react';
import { Chat } from '../Chat/Chat';
import './Professor.scss';

export const Professor = ({ user, socketConnection, classId }) => {
  return (
    <div className='Profssor-camera-display'>
      <Chat socketConnection={socketConnection} user={user}></Chat>
      {/* <CaptureCamera /> */}
    </div>
  );
};
