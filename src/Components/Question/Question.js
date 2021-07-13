import React, { useEffect, useState, useRef } from 'react';
import * as questionService from '../../Services/QuestionService';
import { format } from 'date-fns';
import { IconButton, TextField, Tooltip } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { getRandomPastelColor } from '../../Utils/managingColors';
import { FormattedMessage, useIntl } from 'react-intl';
import { Scrollbars } from 'react-custom-scrollbars';
import { PALETTE } from '../../Utils/constants';
import { AreaHeader } from '../../Shared/AreaHeader.js';
import '../Chat/Chat.scss';

const Question = ({ socketConnection, classConnected }) => {
  const questionsEndRef = useRef(null);
  const [questions, setQuestions] = useState([]);
  const [newOutsideQuestion, setNewOutsideQuestion] = useState();
  const [newText, setNewText] = useState('');

  const getQuestions = () => {
    if (socketConnection && classConnected.user) {
      questionService.questionListen(socketConnection, (data) => {
        setNewOutsideQuestion(data);
      });
      questionService.getQuestions(
        socketConnection,
        classConnected.classId,
        setQuestions,
      );
    }
  };
  const sendQuestion = () => {
    if (!newText) return;
    questionService.listenQuestion(socketConnection, {
      classRoom: classConnected.classId,
      from: classConnected.user.name,
      text: newText,
      date: new Date(),
    });
    setNewText('');
  };
  useEffect(() => {
    questionsEndRef?.current?.scrollToBottom();
  }, [questions]);
  useEffect(getQuestions, [socketConnection, classConnected.user]);
  useEffect(() => {
    if (newOutsideQuestion) {
      setQuestions([...questions, newOutsideQuestion]);
    }
  }, [newOutsideQuestion]);
  return (
    <AreaHeader text='question'>
      <div className='container-chat'>
        <div className='Chat-messages-display'>
          <Scrollbars
            style={{ width: '100%', height: '300%' }}
            autoHideTimeout={1000}
            ref={questionsEndRef}
          >
            {questions
              .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))
              .map((message, index) => {
                return (
                  <Tooltip
                    title={format(
                      new Date(message.date),
                      'dd/MM/yyyy HH:mm:ss',
                    )}
                    key={index}
                    placement='left'
                  >
                    <div className='message-container'>
                      <div
                        style={{
                          color: getRandomPastelColor(
                            classConnected.user.name === message.from ? (
                              <FormattedMessage id='you' />
                            ) : (
                              message.from
                            ),
                          ),
                        }}
                      >
                        {classConnected.user.name === message.from ? (
                          <FormattedMessage id='you' />
                        ) : (
                          message.from
                        )}
                        {':'}&nbsp;
                      </div>
                      {message.text}
                    </div>
                  </Tooltip>
                );
              })}
          </Scrollbars>
        </div>
        <div className='Chat-input-display'>
          <TextField
            value={newText}
            color='primary'
            variant='outlined'
            className='Chat-textfield'
            placeholder={useIntl().formatMessage({ id: 'typeYourTextHere' })}
            onChange={(event) => setNewText(event.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') sendQuestion();
            }}
          />
          <IconButton onClick={sendQuestion} style={{ color: PALETTE.LIGHTER }}>
            <Send />
            {/* <FormattedMessage id='send' /> */}
          </IconButton>
        </div>
      </div>
    </AreaHeader>
  );
};

export default Question;
