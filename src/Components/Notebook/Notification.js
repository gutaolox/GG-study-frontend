import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { IfDiv } from '../../Shared/IfDiv';
import './Notebook.scss';

export const Notification = ({ notification }) => {
  const { text, options, type, answer } = notification;
  const [clickedButton, setClickedButton] = useState(false);
  const [result, setResult] = useState('');

  const handleClickOption = (option) => {
    setClickedButton(true);
    if (type === 'question' && answer) {
      setResult('Voce ' + (option === answer ? 'Acertou' : 'Errou'));
    }
  };

  return (
    <div className='container-notification'>
      <div className='title-notification'>{text}</div>
      <IfDiv
        condition={options.length && !clickedButton}
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
      <IfDiv condition={clickedButton} className='result-notification'>
        {result}
      </IfDiv>
    </div>
  );
};
