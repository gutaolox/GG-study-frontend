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
  const [selectedClass, setSelectedClass] = useState('');
  const [classJoined, setClassJoined] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState();
  const [categories, setCategories] = useState([]);

  const getUser = () => {
    loginService.profile().then((result) => {
      const { data } = result;
      if (data) {
        setUser(data);
      }
    });
  };

  const handleClassSelected = (event) => {
    setSelectedClass(event.target.value);
  };
  const joinClass = () => {
    if (selectedClass && user) {
      setClassJoined(true);
    } else {
      setError('classOrUserNotFound');
    }
  };

  const getClasses = () => {
    if (socketConnection && user) {
      if (user.role === USER_ROLES.STUDENT) {
        classService.getAllStudentClasses(
          socketConnection,
          user._id,
          setClasses,
        );
      } else if (user.role === USER_ROLES.PROFESSOR) {
        classService.getAllProfessorClasses(
          socketConnection,
          user._id,
          setClasses,
        );
      }
    }
  };

  const getCategories = () => {
    if (classes && classes.length) {
      let aux = [];
      classes.forEach((x) => aux.push(x.category));
      aux = [...new Set(aux)];
      setCategories(aux);
    }
  };

  useEffect(getUser, []);
  useEffect(getCategories, [classes]);
  useEffect(getClasses, [socketConnection, user]);
  return (
    <div className='classMenu-container'>
      <IfDiv condition={classJoined} className='classMenu-classroom-container'>
        <Classroom
          classConnected={{
            classId: selectedClass,
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
        <div className='container-class-menu'>
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
            <IfDiv condition={user && user.role === USER_ROLES.STUDENT}>
              <Select
                value={selectedClass}
                onChange={handleClassSelected}
                id='select-classroom-student'
                className='select'
                error={!!error}
              >
                {/* <MenuItem value='60dd02372edf90240c54dde6'>Teste</MenuItem> */}
                {classes?.map((classroom) => {
                  return (
                    <MenuItem key={classroom._id} value={classroom._id}>
                      {classroom.category}
                    </MenuItem>
                  );
                })}
              </Select>
            </IfDiv>
            <IfDiv condition={user && user.role === USER_ROLES.PROFESSOR}>
              <Select
                value={selectedClass}
                onChange={handleClassSelected}
                id='select-classroom-professor'
                className='select'
                error={!!error}
                native
              >
                <option aria-label='None' value='' />
                {categories?.map((category) => {
                  return (
                    <optgroup key={category} label={category}>
                      {classes
                        .filter((x) => x.category === category)
                        ?.map((classroom) => {
                          return (
                            <option key={classroom._id} value={classroom._id}>
                              {classroom.group}
                            </option>
                          );
                        })}
                      ;
                    </optgroup>
                  );
                })}
              </Select>
            </IfDiv>
            <IfDiv condition={error} className='label-error'>
              <FormattedMessage id={error} />
            </IfDiv>
          </FormControl>
          <Button
            variant='contained'
            color='primary'
            onClick={() => joinClass()}
          >
            <FormattedMessage id='joinClass' />
          </Button>
        </div>
      </IfDiv>
    </div>
  );
};

export default ClassMenu;
