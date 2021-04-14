import React from 'react';
import { Chat } from '../Chat/Chat';
import './Professor.scss';

export const Professor = ({ socketConection }) => {
  return (
    <div className='Profssor-camera-display'>
      <Chat socketConection={socketConection}></Chat>
      {/* <CaptureCamera /> */}
    </div>
  );
};
