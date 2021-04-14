import { Button, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import * as chatService from '../Services/ChatService';
import './Chat.scss';

export const Chat = ({ socketConection }) => {
  const [messages, setMessages] = useState([]);
  const [newText, setNewText] = useState('');
  const messageReference = () => messages;
  const getMessages = () => {
    if (socketConection) {
      chatService.messageListen(socketConection, (data) => {
        console.log(messageReference());
        setMessages([...messageReference(), data]);
      });
      chatService.getMessages(socketConection, setMessages);
    }
  };
  useEffect(getMessages, [socketConection]);
  return (
    <div>
      <div className='Chat-messages-display'>
        {messages.map((message, index) => {
          return (
            <div key={index}>
              {message.from}:{message.message}
            </div>
          );
        })}
      </div>
      <div className='Chat-input-display'>
        <TextField
          value={newText}
          variant='outlined'
          color='secondary'
          onChange={(event) => setNewText(event.target.value)}
        />
        <Button
          color='primary'
          variant='secondary'
          onClick={() =>
            chatService.listenMessage(
              socketConection,
              {
                from: 'zezin',
                message: newText,
              },
              (data) => {
                console.log(messageReference());
                setMessages([...messageReference(), data]);
              },
            )
          }
        >
          Enviar
        </Button>
      </div>
    </div>
  );
};
