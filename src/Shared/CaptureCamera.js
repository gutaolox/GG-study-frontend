import React, { useEffect, useRef } from 'react';
import { USER_ROLES } from '../Utils/constants';
import './style.scss';

export const CaptureCamera = ({ socket, userClass, started, classId }) => {
  const userVideo = useRef();
  // Criar aluno pra receber o peer e montar backend
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((myStream) => {
        if (userVideo.current) {
          if (userClass === USER_ROLES.PROFESSOR) {
            userVideo.current.srcObject = myStream;
          }
        }
      });
  }, []);

  return (
    <div>
      {/* <audio></audio> */}
      <video
        playsInline
        muted={userClass === USER_ROLES.PROFESSOR}
        ref={userVideo}
        autoPlay
      />
    </div>
  );
};
