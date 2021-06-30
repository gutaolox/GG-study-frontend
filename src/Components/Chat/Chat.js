import React, { useEffect, useState, useRef } from 'react';
import * as chatService from '../../Services/ChatService';
import { format } from 'date-fns';
import { IconButton, TextField, Tooltip } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { getRandomPastelColor } from '../../Utils/managingColors';
import { FormattedMessage } from 'react-intl';
import { Scrollbars } from 'react-custom-scrollbars';
import './Chat.scss';
import { PALETTE } from '../../Utils/constants';

export const Chat = ({ socketConnection, user }) => {
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [newOutsideMessage, setNewOutsideMessage] = useState();
  const [newText, setNewText] = useState('');

  const getMessages = () => {
    if (socketConnection && user) {
      chatService.messageListen(socketConnection, (data) => {
        setNewOutsideMessage(data);
      });
      chatService.getMessages(socketConnection, setMessages);
    }
  };
  const sendMessage = () => {
    if (!newText) return;
    console.log('user ', user);
    chatService.listenMessage(socketConnection, {
      from: user.name,
      text: newText,
      date: new Date(),
    });
    setNewText('');
  };
  useEffect(() => {
    messagesEndRef?.current?.scrollToBottom();
  }, [messages]);
  useEffect(getMessages, [socketConnection, user]);
  useEffect(() => {
    if (newOutsideMessage) {
      setMessages([...messages, newOutsideMessage]);
    }
  }, [newOutsideMessage]);
  return (
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
                  title={format(new Date(message.date), 'dd/MM/yyyy HH:mm:ss')}
                  key={index}
                  placement='left'
                >
                  <div className='message-container'>
                    <div
                      style={{
                        color: getRandomPastelColor(
                          user.name === message.from ? (
                            <FormattedMessage id='you' />
                          ) : (
                            message.from
                          ),
                        ),
                      }}
                    >
                      {user.name === message.from ? (
                        <FormattedMessage id='you' />
                      ) : (
                        message.from
                      )}{':'}&nbsp;
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
          className='Chat-textfield'
          onChange={(event) => setNewText(event.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
        />
        <IconButton
          onClick={sendMessage}
          style={{ color: PALETTE.LIGHTER }}
        >
          <Send />
          {/* <FormattedMessage id='send' /> */}
        </IconButton>
      </div>
    </div>
  );
};
