import React from 'react';
// import React, { useEffect, useState } from 'react';
// import * as loginService from '../Services/LoginService';
// import { IfDiv } from '../Shared/IfDiv';
// import { MenuItem, Select } from '@material-ui/core';
import './Classroom.scss';
export const Classroom = ({ socketConnection }) => {
  return (
    <main className='container'>
      <section className='coluna-1'>
        <div className='menu-container'></div>
        <div className='notebook-container'></div>
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
