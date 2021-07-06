import React, { useEffect, useState } from 'react';
import * as classService from '../../Services/ClassService';
import * as loginService from '../../Services/LoginService';
import { IfDiv } from '../../Shared/IfDiv';
import {
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { USER_ROLES } from '../../Utils/constants';
import { Classroom } from '../index.js';
import icone from '../../Images/icone.png';

import './ClassMenu.scss';

const ClassMenu = ({ socketConnection }) => {
  const [classes, setClasses] = useState();
  const [selectedClass, setSelectedClass] = useState();
  const [classJoined, setClassJoined] = useState(false);
  const [error, setError] = useState();
  const [user, setUser] = useState();

  const getUser = () => {
    loginService.profile().then((result) => {
      const { data } = result;
      setUser(data);
      if (data) {
        setUser(data);
      }
    });
  };

  const handleClassSelected = (event) => {
    setSelectedClass(event.target.value);
  };
  const joinClass = () => {
    setClassJoined(true);
  };

  const getClasses = () => {
    if (socketConnection) {
      classService.getAllClass(socketConnection, setClasses);
    }
  };

  useEffect(getUser, []);
  useEffect(getClasses, [socketConnection]);
  return (
    <div className='container-class-menu'>
      <IfDiv condition={classJoined}>
        <Classroom
          classConnected={{
            classId: selectedClass || '60dd02372edf90240c54dde6',
            user,
            isStudent: user && user.role === USER_ROLES.STUDENT,
            throwError: setError,
            quitClass: () => {
              setClassJoined(false);
            },
          }}
          socketConnection={socketConnection}
        />
      </IfDiv>
      <IfDiv
        condition={!classJoined}
        className='container-class-menu-height-organization'
      >
        <img
          className='icon-GGStudy'
          src={icone}
          alt='Icon GG Study'
          title='GG Study'
        />
        <FormControl>
          <InputLabel id='label-select-classroom' className='label-select'>
            <FormattedMessage id='SelectYourClassroom' />
          </InputLabel>
          <Select
            value={selectedClass}
            onChange={handleClassSelected}
            labelId='label-select-classroom'
            id='select-classroom'
            className='select'
            displayEmpty={false}
            error={error}
          >
            {classes?.map((classroom) => {
              return (
                <MenuItem key={classroom._id} value={classroom._id}>
                  {classroom.category}
                </MenuItem>
              );
            })}
          </Select>
          <IfDiv condition={error}>
            <FormattedMessage id={error} />
          </IfDiv>
        </FormControl>
        <Button variant='contained' color='primary' onClick={() => joinClass()}>
          <FormattedMessage id='joinClass' />
        </Button>
      </IfDiv>
    </div>
  );
};

export default ClassMenu;
