import React from 'react';
import { CaptureCamera } from '../Shared/CaptureCamera';
import { USER_ROLES } from '../Utils/constants';
import './Student.scss';

export const Student = ({ socketConection, classId, user }) => {
  return (
    <div className='Student-camera-display'>
      <CaptureCamera
        started={true}
        socket={socketConection}
        userClass={USER_ROLES.STUDENT}
        user={user}
        classId={classId}
      />
    </div>
  );
};
