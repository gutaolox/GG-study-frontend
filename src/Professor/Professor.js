import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { CaptureCamera } from '../Shared/CaptureCamera';
import { IfDiv } from '../Shared/IfDiv';
import { USER_ROLES } from '../Utils/constants';
import './Professor.scss';
import * as loginService from '../Services/LoginService';
import * as professorService from '../Services/ProfessorService';
import { connect } from 'twilio-video';

export const Professor = ({ socketConnection }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [professor, setProfessor] = useState();
  const [roomToken, setRoomToken] = useState();
  const [classId, setClassId] = useState();

  const createRoom = () => {
    if (roomToken) {
      console.log('teste');
      connect(roomToken, { name: classId }).then(
        (room) => {
          console.log(`Successfully joined a Room: ${room}`);
          room.on('participantConnected', (participant) => {
            console.log(`A remote Participant connected: ${participant}`);
          });
        },
        (error) => {
          console.error(`Unable to connect to Room: ${error.message}`);
        },
      );
    }
  };
  const initClass = () => {
    loginService.profile().then((result) => {
      const { data } = result;
      setProfessor(data);
      professorService.initClass(
        socketConnection,
        data._id,
        setClassId,
        setRoomToken,
      );
      setHasStarted(true);
    });
  };

  useEffect(createRoom, [roomToken]);

  return (
    <div className='Professor-camera-display'>
      {/* <Chat socketConnection={socketConnection} user={user}></Chat> */}
      <IfDiv condition={!hasStarted}>
        <Button
          color='primary'
          onClick={() => {
            initClass();
          }}
        >
          <FormattedMessage id='initClass' />
        </Button>
      </IfDiv>
      <IfDiv condition={hasStarted}>
        <CaptureCamera
          started={hasStarted}
          socket={socketConnection}
          userClass={USER_ROLES.PROFESSOR}
          user={professor}
          classId={classId}
        />
      </IfDiv>
    </div>
  );
};
