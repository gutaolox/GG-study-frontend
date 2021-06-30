import React, { useEffect, useState } from 'react';
import * as loginService from '../../Services/LoginService';
import * as professorService from '../../Services/ProfessorService';
import * as classService from '../../Services/ClassService';
import { IfDiv } from '../../Shared/IfDiv';
import { IconButton, Tooltip } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { Chat } from '../Chat/Chat.js';
import { CameraArea } from '../VideoConference/CameraArea';

import logo from '../../Images/logo.png';
import './Classroom.scss';
import { PALETTE, USER_ROLES } from '../../Utils/constants';
import { FormattedMessage } from 'react-intl';

export const Classroom = ({ socketConnection, studentClass }) => {
  const [roomToken, setRoomToken] = useState();
  const [isStudent, setIsStudent] = useState(false);
  const [user, setUser] = useState();
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
        professorService.initClass(
          socketConnection,
          {
            professorId: user._id,
            className: Math.trunc(Math.random() * 1000).toString(),
          },
          setRoomToken,
        );
      } else {
        classService.addStudent(
          socketConnection,
          studentClass,
          user._id,
          setRoomToken,
        );
      }
    }
  };
  useEffect(getUser, []);
  useEffect(initClass, [user]);
  return (
    <main className='container-classroom'>
      <section className='coluna-1'>
        <div className='menu-container'>
          <Tooltip title={<FormattedMessage id='back'/>}>
            <IconButton aria-label='back' style={{ color: PALETTE.LIGHTER }}>
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
          <CameraArea user={user} roomToken={roomToken} />
        </div>
        <div className='video-container'></div>
        <div className='question-container'></div>
      </section>
      <section className='coluna-3'>
        <div className='group-container'></div>
        <div className='chat-container'>
          <Chat socketConnection={socketConnection} user={user}></Chat>
        </div>
      </section>
    </main>
  );
};
