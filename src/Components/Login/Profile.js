// @flow
import './Login.scss';
import React, { useEffect, useState } from 'react';
import * as loginService from '../../Services/LoginService';
import { Button } from '@material-ui/core';
import socketIOClient from 'socket.io-client';

const Profile = () => {
  const [user, setUser] = useState({});
  const [test, setTest] = useState();
  const [s, setS] = useState({});
  const getProfile = () => {
    loginService.profile().then((result) => {
      const { data } = result;
      setUser(data);
    });
  };
  useEffect(() => {
    const socket = socketIOClient(`${process.env.REACT_APP_LINK}`, {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: localStorage.getItem('token'),
          },
        },
      },
    });
    setS(socket);
    socket.on('connect', () => {
      setTest('teste');
    });

    socket.on('teste', (data) => {
      setTest(data);
    });

    getProfile();
    return () => socket.disconnect();
  }, []);

  return (
    <div className='Login-form'>
      <div style={{ color: 'black' }}>{user._id}</div>
      <div style={{ color: 'black' }}>{user.username}</div>
      <div style={{ color: 'black' }}>{user.role}</div>
      <div style={{ color: 'black' }}>{test}</div>
      <Button
        variant='outlined'
        color='primary'
        onClick={() => {
          s.emit('createChat', {});
        }}
      >
        Teste
      </Button>
    </div>
  );
};

export default Profile;
