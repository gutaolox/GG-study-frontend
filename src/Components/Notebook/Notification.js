import React from 'react';
import { Button } from '@material-ui/core';
import { IfDiv } from '../../Shared/IfDiv';
import * as notebookService from '../../Services/NotebookService.js';
import './Notebook.scss';

export const Notification = ({
  notification,
  socketConnection,
  classConnected,
  setterNotification,
  nextQuestion,
}) => {
  const { text, options } = notification;

  const handleClickOption = (option) => {
    if (option) {
      notebookService.answerNotification(
        socketConnection,
        classConnected.classId,
        classConnected.user._id,
        notification.order,
        option,
        setterNotification,
      );
      nextQuestion();
    }
  };

  return (
    <div className='container-notification'>
      <div className='title-notification'>{text}</div>
      <IfDiv
        condition={options && options.length}
        className='container-options-notification'
      >
        {options?.map((op, i) => (
          <Button
            key={i}
            className='option-notification'
            onClick={() => {
              handleClickOption(op);
            }}
          >
            {op}
          </Button>
        ))}
      </IfDiv>
    </div>
  );
};
