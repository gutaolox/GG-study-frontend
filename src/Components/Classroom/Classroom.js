import React, { useEffect, useState } from 'react';
import * as loginService from '../../Services/LoginService';
import { IfDiv } from '../../Shared/IfDiv';
import { IconButton, Tooltip } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { getRandomPastelColor } from '../../Utils/managingColors';

import logo from '../../Images/logo.png';
import './Classroom.scss';
export const Classroom = ({ socketConnection }) => {
  const [isStudent, setIsStudent] = useState(false);
  const getUser = () => {
    loginService.profile().then((result) => {
      const { data } = result;
      setIsStudent(data && data.role === 'Student');
    });
  };
  useEffect(getUser, []);
  return (
    <main className='container-classroom'>
      <section className='coluna-1'>
        <div className='menu-container'>
          <Tooltip title='Back'>
            <IconButton
              aria-label='back'
              style={{ color: getRandomPastelColor() }}
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
        <div className='camera-container'></div>
        <div className='video-container'></div>
        <div className='question-container'></div>
      </section>
      <section className='coluna-3'>
        <div className='group-container'></div>
        <div className='chat-container'></div>
      </section>
    </main>
  );
};
