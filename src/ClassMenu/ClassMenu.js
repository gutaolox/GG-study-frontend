import React, { useEffect, useState } from 'react';
import * as loginService from '../Services/LoginService';
import { IfDiv } from '../Shared/IfDiv';
import { Student } from '../Students/Student';
import * as classService from '../Services/ClassService';
import { MenuItem, Select } from '@material-ui/core';

export const ClassMenu = ({ socketConnection }) => {
  const [student, setStudent] = useState();
  const [classRoom, setClassRoom] = useState();
  const [selectedClass, setSelectedClass] = useState();

  const handleClassSelected = (event) => {
    setSelectedClass(event.target.value);
  };
  console.log(socketConnection);
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

  useEffect(getClassRoom, [socketConnection]);
  useEffect(getUser, []);
  return (
    <div>
      <IfDiv condition={selectedClass}>
        <Student
          user={student}
          socketConection={socketConnection}
          classId={selectedClass}
        />
      </IfDiv>
      <IfDiv condition={!selectedClass}>
        <Select value={selectedClass} onChange={handleClassSelected}>
          {classRoom?.map((classes) => {
            return (
              <MenuItem key={classes._id} value={classes._id}>
                {classes._id}
              </MenuItem>
            );
          })}
        </Select>
      </IfDiv>
    </div>
  );
};
