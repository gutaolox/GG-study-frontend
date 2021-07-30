import React, { useEffect, useState } from 'react';
import { AreaHeader } from '../../Shared/AreaHeader';
import { Avatar } from '@material-ui/core';
import * as classService from '../../Services/ClassService.js';
import './Participants.scss';

const Participants = ({ socketConnection, classConnected }) => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState();
  const [removedStudent, setRemovedStudent] = useState();

  const getStudents = () => {
    if (!classConnected.user || !socketConnection) return;
    classService.studentsListen(
      socketConnection,
      setNewStudent,
      setRemovedStudent,
    );
    classService.getAllStudentsByClass(
      socketConnection,
      classConnected.classId,
      setStudents,
    );
  };

  useEffect(getStudents, [socketConnection, classConnected.user]);
  useEffect(() => {
    if (!newStudent) return;
    setStudents([...students, newStudent]);
  }, [newStudent]);

  useEffect(() => {
    if (!removedStudent) return;
    setStudents(students.filter((x) => x.id !== removedStudent.id));
  }, [removedStudent]);

  return (
    <AreaHeader text='participants'>
      {students?.map((student, index) => {
        return (
          <div className='participants-container' key={index}>
            <Avatar
              alt={student?.user?.name || student?.name}
              className='participants-avatar'
            >
              {(student?.user?.name || student?.name)
                ?.split(' ')
                .map((x) => x.substr(0, 1))
                .join('')
                .substr(0, 2)
                .toUpperCase()}
            </Avatar>
            <p>{student?.user?.name || student?.name}</p>
          </div>
        );
      })}
    </AreaHeader>
  );
};

export default Participants;
