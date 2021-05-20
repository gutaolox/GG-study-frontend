import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { IfDiv } from '../../Shared/IfDiv';

export const ConferenceMenu = (muted, setMuted, hasVideo, setHasVideo) => {
  //Implementar funções chamando o mute e o unmute
  return (
    <div className='ConferenceMenu-menu-organization'>
      <Button
        onClick={() => {
          setMuted(!muted);
        }}
      >
        <IfDiv condition={muted}>
          <FormattedMessage id='unmute' />
        </IfDiv>
        <IfDiv condition={!muted}>
          <FormattedMessage id='mute' />
        </IfDiv>
      </Button>
      <Button
        onClick={() => {
          setHasVideo(!hasVideo);
        }}
      >
        <IfDiv condition={hasVideo}>
          <FormattedMessage id='hideVideo' />
        </IfDiv>
        <IfDiv condition={!hasVideo}>
          <FormattedMessage id='showVideo' />
        </IfDiv>
      </Button>
    </div>
  );
};
