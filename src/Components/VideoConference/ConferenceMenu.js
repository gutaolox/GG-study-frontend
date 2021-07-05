import { IconButton } from '@material-ui/core';
import React from 'react';
import { IfDiv } from '../../Shared/IfDiv';
import { Mic, MicOff, Videocam, VideocamOff } from '@material-ui/icons';
import { PALETTE } from '../../Utils/constants';

export const ConferenceMenu = ({
  muted,
  connected,
  setMuted,
  hasVideo,
  setHasVideo,
}) => {
  // Implementar funções chamando o mute e o unmute
  return (
    <div className='ConferenceMenu-menu-organization'>
      <IconButton
        onClick={() => {
          setMuted(!muted);
        }}
        disabled={!connected}
        style={{ color: PALETTE.LIGHTER }}
      >
        <IfDiv condition={muted}>
          <MicOff
            style={{ fontSize: 20 }}
            color={connected ? '' : 'disabled'}
          />
        </IfDiv>
        <IfDiv condition={!muted}>
          <Mic style={{ fontSize: 20 }} color={connected ? '' : 'disabled'} />
        </IfDiv>
      </IconButton>
      <IconButton
        onClick={() => {
          setHasVideo(!hasVideo);
        }}
        disabled={!connected}
        style={{ color: PALETTE.LIGHTER }}
      >
        <IfDiv condition={hasVideo}>
          <Videocam
            style={{ fontSize: 20 }}
            color={connected ? '' : 'disabled'}
          />
        </IfDiv>
        <IfDiv condition={!hasVideo}>
          <VideocamOff
            style={{ fontSize: 20 }}
            color={connected ? '' : 'disabled'}
          />
        </IfDiv>
      </IconButton>
    </div>
  );
};
