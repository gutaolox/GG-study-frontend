import React, { useEffect, useState } from 'react';
import * as loginService from '../../Services/LoginService';
import { IfDiv } from '../../Shared/IfDiv';
import * as classService from '../../Services/ClassService';
import { Button, MenuItem, Select } from '@material-ui/core';
import { connect } from 'twilio-video';
import { Student } from '../Students/Student';
import { FormattedMessage } from 'react-intl';

export const ClassMenu = ({ socketConnection }) => {
  const [student, setStudent] = useState();
  const [classRoom, setClassRoom] = useState();
  const [selectedClass, setSelectedClass] = useState();
  const [classJoined, setClassJoined] = useState(false);
  const [authToken, setAuthToken] = useState();

  const handleClassSelected = (event) => {
    setSelectedClass(event.target.value);
  };

  const joinClass = () => {
    classService.addStudent(
      socketConnection,
      selectedClass,
      student._id,
      setAuthToken,
    );
  };

  const getUser = () => {
    loginService.profile().then((result) => {
      const { data } = result;
      setStudent(data);
    });
  };

  const getClassRoom = () => {
    if (socketConnection) {
      classService.getAllClass(socketConnection, setClassRoom);
    }
  };
  useEffect(() => {
    if (authToken) {
      connect(authToken, { name: selectedClass }).then(
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
      setClassJoined(true);
    }
  }, [authToken]);
  useEffect(getClassRoom, [socketConnection]);
  useEffect(getUser, []);
  return (
    <div>
      <IfDiv condition={classJoined}>
        <Student
          user={student}
          socketConnection={socketConnection}
          classId={selectedClass}
          setClassId={setSelectedClass}
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
