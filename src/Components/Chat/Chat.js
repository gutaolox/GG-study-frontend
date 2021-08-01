import React, { useEffect, useState, useRef } from 'react';
import * as chatService from '../../Services/ChatService';
import { format } from 'date-fns';
import { IconButton, TextField, Tooltip } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { getRandomPastelColor } from '../../Utils/managingColors';
import { FormattedMessage, useIntl } from 'react-intl';
import { Scrollbars } from 'react-custom-scrollbars';
import { PALETTE } from '../../Utils/constants';
import { AreaHeader } from '../../Shared/AreaHeader.js';
import './Chat.scss';

const Chat = ({ socketConnection, classConnected }) => {
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [newOutsideMessage, setNewOutsideMessage] = useState();
  const [newText, setNewText] = useState('');

  const getMessages = () => {
    if (!socketConnection || !classConnected.user) return;
    chatService.messageListen(socketConnection, setNewOutsideMessage);
    chatService.getMessages(
      socketConnection,
      classConnected.classId,
      setMessages,
    );
  };
  const sendMessage = () => {
    if (!newText) return;
    chatService.listenMessage(socketConnection, {
      classRoom: classConnected.classId,
      from: classConnected.user.name,
      text: newText,
      date: new Date(),
    });
    setNewText('');
  };
  useEffect(() => {
    messagesEndRef?.current?.scrollToBottom();
  }, [messages]);
  useEffect(getMessages, [socketConnection, classConnected.user]);
  useEffect(() => {
    if (newOutsideMessage) {
      setMessages([...messages, newOutsideMessage]);
    }
  }, [newOutsideMessage]);
  return (
    <AreaHeader text='chat'>
      <div className='container-chat'>
        <div className='Chat-messages-display'>
          <Scrollbars
            style={{ width: '100%', height: '300%' }}
            autoHideTimeout={1000}
            ref={messagesEndRef}
          >
            {messages
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
                      <span
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
                      </span>
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
              if (e.key === 'Enter') sendMessage();
            }}
          />
          <IconButton onClick={sendMessage} style={{ color: PALETTE.LIGHTER }}>
            <Send />
            {/* <FormattedMessage id='send' /> */}
          </IconButton>
        </div>
      </div>
    </AreaHeader>
  );
};

export default Chat;
