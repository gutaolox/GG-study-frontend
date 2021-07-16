import React, { useEffect, useState } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { FormattedMessage } from 'react-intl';
import {
  Chat,
  Participants,
  CameraArea,
  Presentation,
  Question,
} from '../index.js';
import { IfDiv } from '../../Shared/IfDiv';
import { PALETTE } from '../../Utils/constants';
import logo from '../../Images/logo.png';
import * as classService from '../../Services/ClassService';
import './Classroom.scss';

const Classroom = ({ socketConnection, classConnected }) => {
  const [roomToken, setRoomToken] = useState();
  const [closeRoom, setCloseRoom] = useState(false);
  const [initialPage, setInitialPage] = useState();
  const [totalPage, setTotalPage] = useState();

  const initClass = () => {
    if (classConnected.user) {
      if (!classConnected.isStudent) {
        classConnected.throwError('');
        classService.initClass(
          socketConnection,
          {
            idClass: classConnected.classId,
          },
          setRoomToken,
          setInitialPage,
          setTotalPage,
        );
      } else {
        classService.addStudent(
          socketConnection,
          classConnected.classId,
          classConnected.user._id,
          setRoomToken,
          setInitialPage,
          setTotalPage,
        );
      }
    }
  };

  useEffect(initClass, [classConnected.user]);
  useEffect(() => {
    if (closeRoom) {
      classConnected.quitClass();
      if (!classConnected.isStudent) {
        classService.closeRoom(
          socketConnection,
          classConnected.classId,
          setCloseRoom,
        );
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
        <IfDiv
          condition={classConnected.isStudent}
          className='notebook-container'
        ></IfDiv>
        <IfDiv
          condition={!classConnected.isStudent}
          className='notebook-container'
        ></IfDiv>
        <IfDiv
          condition={!classConnected.isStudent}
          className='notebook-container'
        ></IfDiv>
      </section>
      <section className='coluna-2'>
        <div className='Classroom-camera-container'>
          <CameraArea
            classConnected={classConnected}
            roomToken={roomToken}
            closeRoom={() => {
              setCloseRoom(false);
            }}
          />
        </div>
        <div className='video-container'>
          <Presentation
            socketConnection={socketConnection}
            classConnected={classConnected}
            initialPage={initialPage}
            totalPages={totalPage}
          />
        </div>
        <div className='question-container'>
          <Question
            socketConnection={socketConnection}
            classConnected={classConnected}
          ></Question>
        </div>
      </section>
      <section className='coluna-3'>
        <div className='group-container'>
          <Participants
            socketConnection={socketConnection}
            classConnected={classConnected}
          />
        </div>
        <div className='chat-container'>
          <Chat
            socketConnection={socketConnection}
            classConnected={classConnected}
          ></Chat>
        </div>
      </section>
    </main>
  );
};

export default Classroom;
