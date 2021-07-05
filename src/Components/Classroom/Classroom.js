import React, { useEffect, useState } from 'react';
import * as loginService from '../../Services/LoginService';
import * as classService from '../../Services/ClassService';
import { IfDiv } from '../../Shared/IfDiv';
import { IconButton, Tooltip } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { Chat, Participants, CameraArea } from '../index.js';
import logo from '../../Images/logo.png';
import './Classroom.scss';
import { PALETTE, USER_ROLES } from '../../Utils/constants';
import { FormattedMessage } from 'react-intl';

const Classroom = ({
  socketConnection,
  studentClass,
  quitClass,
  idClass = '60dd02372edf90240c54dde6',
  throwError,
}) => {
  const [roomToken, setRoomToken] = useState();
  const [isStudent, setIsStudent] = useState(false);
  const [user, setUser] = useState();
  const [closeRoom, setCloseRoom] = useState(false);
  const getUser = () => {
    loginService.profile().then((result) => {
      const { data } = result;
      setUser(data);
      setIsStudent(data && data.role === USER_ROLES.STUDENT);
      if (data) {
        setUser(data);
      }
    });
  };
  const initClass = () => {
    if (user) {
      if (user.role === USER_ROLES.PROFESSOR) {
        throwError('');
        classService.initClass(
          socketConnection,
          {
            idClass: idClass,
          },
          setRoomToken,
        );
      } else {
        classService.addStudent(
          socketConnection,
          idClass,
          user._id,
          setRoomToken,
        );
      }
    }
  };
  useEffect(getUser, []);
  useEffect(initClass, [user]);
  useEffect(() => {
    if (closeRoom) {
      quitClass();
      if (user.role === USER_ROLES.PROFESSOR) {
        classService.closeRoom(socketConnection, idClass, setCloseRoom);
      }
    }
  }, [closeRoom]);
  return (
    <main className='container-classroom'>
      <section className='coluna-1'>
        <div className='menu-container'>
          <Tooltip title={<FormattedMessage id='back' />}>
            <IconButton
              onClick={() => {
                setCloseRoom(true);
              }}
              aria-label='back'
              style={{ color: PALETTE.LIGHTER }}
            >
              <ArrowBack style={{ fontSize: 40 }} />
            </IconButton>
          </Tooltip>
          <img src={logo} alt='Logo GG Study' title='Logo GG Study'></img>
        </div>
        <IfDiv condition={isStudent} className='notebook-container'></IfDiv>
        <IfDiv condition={!isStudent} className='notebook-container'></IfDiv>
        <IfDiv condition={!isStudent} className='notebook-container'></IfDiv>
      </section>
      <section className='coluna-2'>
        <div className='Classroom-camera-container'>
          <CameraArea
            closeRoom={closeRoom}
            user={user}
            roomToken={roomToken}
            throwError={throwError}
          />
        </div>
        <div className='video-container'></div>
        <div className='question-container'></div>
      </section>
      <section className='coluna-3'>
        <div className='group-container'>
          <Participants />
        </div>
        <div className='chat-container'>
          <Chat
            socketConnection={socketConnection}
            user={user}
            idClass={idClass}
          ></Chat>
        </div>
      </section>
    </main>
  );
};

export default Classroom;
