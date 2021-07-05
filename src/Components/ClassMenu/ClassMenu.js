import React, { useEffect, useState } from 'react';
import * as classService from '../../Services/ClassService';
import { IfDiv } from '../../Shared/IfDiv';
import {
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { Classroom } from '../index.js';
import icone from '../../Images/icone.png';

import './ClassMenu.scss';

const ClassMenu = ({ socketConnection }) => {
  const [classRoom, setClassRoom] = useState();
  const [selectedClass, setSelectedClass] = useState();
  const [classJoined, setClassJoined] = useState(false);
  const [error, setError] = useState();

  const handleClassSelected = (event) => {
    setSelectedClass(event.target.value);
  };
  const joinClass = () => {
    setClassJoined(true);
  };

  const getClassRoom = () => {
    if (socketConnection) {
      classService.getAllClass(socketConnection, setClassRoom);
    }
  };

  useEffect(getClassRoom, [socketConnection]);
  return (
    <div className='container-class-menu'>
      <IfDiv condition={classJoined}>
        <Classroom
          socketConnection={socketConnection}
          studentClass={selectedClass}
          quitClass={() => {
            setClassJoined(false);
          }}
          throwError={setError}
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
            {classRoom?.map((classes) => {
              return (
                <MenuItem key={classes._id} value={classes._id}>
                  {classes.category}
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
