import { format } from 'date-fns';
import { Button, TextField, Tooltip } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import * as chatService from '../Services/ChatService';
import './Chat.scss';

export const Chat = ({ socketConnection, user }) => {
  const [messages, setMessages] = useState([]);
  const [newOutsideMessage, setNewOutsideMessage] = useState();
  const [newText, setNewText] = useState('');

  const getMessages = () => {
    if (socketConnection) {
      chatService.messageListen(socketConnection, (data) => {
        setNewOutsideMessage(data);
      });
      chatService.getMessages(socketConnection, setMessages);
    }
  };

  const sendMessage = () => {
    if (!newText) return;
    chatService.listenMessage(socketConnection, {
      from: user.name,
      text: newText,
      date: new Date(),
    });
    setNewText('');
  };

  useEffect(getMessages, [socketConnection]);
  useEffect(() => {
    if (newOutsideMessage) {
      setMessages([...messages, newOutsideMessage]);
    }
  }, [newOutsideMessage]);
  return (
    <div>
      <div className='Chat-messages-display'>
        {messages
          .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))
          .map((message, index) => {
            return (
              <Tooltip
                title={format(new Date(message.date), 'dd/MM/yyyy HH:mm:ss')}
                key={index}
                placement='left'
              >
                <div>
                  {message.from}: {message.text}
                </div>
              </Tooltip>
            );
          })}
      </div>
      <div className='Chat-input-display'>
        <TextField
          value={newText}
          variant='outlined'
          color='secondary'
          onChange={(event) => setNewText(event.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
        />
        <Button color='primary' variant='contained' onClick={sendMessage}>
          Enviar
        </Button>
      </div>
    </div>
  );
};
