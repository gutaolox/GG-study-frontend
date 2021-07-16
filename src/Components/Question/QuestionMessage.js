import React, { useState } from 'react';
import { format } from 'date-fns';
import { IconButton, Popover, Typography } from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import { getRandomPastelColor } from '../../Utils/managingColors';
import { FormattedMessage } from 'react-intl';
import '../Chat/Chat.scss';
import { IfDiv } from '../../Shared/IfDiv';

const QuestionMessage = ({ question, index, isStudent }) => {
  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);
  const idPopover = open ? 'simple-popover' : undefined;

  return (
    <div className='message-container'>
      <div
        style={{
          color: getRandomPastelColor('Pergunta' + (index + 1)),
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <FormattedMessage id='question' />
        {` ${index + 1}`}
        {isStudent ? ':' : ''}&nbsp;
        <IfDiv condition={!isStudent}>
          <IconButton
            aria-describedby={idPopover}
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
            }}
            className='question-icon'
          >
            <MoreHoriz />
          </IconButton>
          <Popover
            id={idPopover}
            open={open}
            anchorEl={anchorEl}
            onClose={() => {
              setAnchorEl(null);
            }}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Typography className='question-typography'>
              {format(new Date(question.date), 'HH:mm:ss')}
              <div
                style={{
                  color: getRandomPastelColor('Pergunta' + (index + 1)),
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {question.from}
              </div>
            </Typography>
          </Popover>
        </IfDiv>
        &nbsp;
      </div>
      {question.text}
    </div>
  );
};

export default QuestionMessage;
