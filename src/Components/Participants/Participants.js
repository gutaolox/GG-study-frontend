import React, { useEffect, useState } from 'react';
import { AreaHeader } from '../../Shared/AreaHeader';
import * as classService from '../../Services/ClassService.js';

const Participants = ({ socketConnection, classConnected }) => {
  const [students, setStudents] = useState([]);

  const getStudents = () => {
    if (!classConnected.user || !socketConnection) return;

    classService.getAllStudentsByClass(
      socketConnection,
      classConnected.classId,
      setStudents,
    );
  };

  useEffect(getStudents, [socketConnection, classConnected.user]);

  return (
    <AreaHeader text='participants'>
      {students?.map((student, index) => {
        return <p key={index}>{student?.user?.name}</p>;
      })}
    </AreaHeader>
  );
};

export default Participants;
