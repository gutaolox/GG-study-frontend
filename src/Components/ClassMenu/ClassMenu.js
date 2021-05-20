import React, { useEffect, useState } from 'react';
import { IfDiv } from '../../Shared/IfDiv';
import * as classService from '../../Services/ClassService';
import { Button, MenuItem, Select } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { Classroom } from '../Classroom/Classroom';

export const ClassMenu = ({ socketConnection }) => {
  const [classRoom, setClassRoom] = useState();
  const [selectedClass, setSelectedClass] = useState();
  const [classJoined, setClassJoined] = useState(false);

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
    <div>
      <IfDiv condition={classJoined}>
        <Classroom
          socketConnection={socketConnection}
          studentClass={selectedClass}
        />
      </IfDiv>
      <IfDiv condition={!classJoined}>
        <Select value={selectedClass} onChange={handleClassSelected}>
          {classRoom?.map((classes) => {
            return (
              <MenuItem key={classes._id} value={classes._id}>
                {classes._id}
              </MenuItem>
            );
          })}
        </Select>
        <Button
          variant='outlined'
          color='secondary'
          onClick={() => joinClass()}
        >
          <FormattedMessage id='joinClass' />
        </Button>
      </IfDiv>
    </div>
  );
};
