import { Button } from '@material-ui/core';
import React from 'react';
import { IfDiv } from '../../Shared/IfDiv';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';

export const ConferenceMenu = ({ muted, setMuted, hasVideo, setHasVideo }) => {
  // Implementar funções chamando o mute e o unmute
  return (
    <div className='ConferenceMenu-menu-organization'>
      <Button
        onClick={() => {
          setMuted(!muted);
        }}
      >
        <IfDiv condition={muted}>
          <MicOffIcon />
        </IfDiv>
        <IfDiv condition={!muted}>
          <MicIcon />
        </IfDiv>
      </Button>
      <Button
        onClick={() => {
          setHasVideo(!hasVideo);
        }}
      >
        <IfDiv condition={hasVideo}>
          <VideocamIcon />
        </IfDiv>
        <IfDiv condition={!hasVideo}>
          <VideocamOffIcon />
        </IfDiv>
      </Button>
    </div>
  );
};
