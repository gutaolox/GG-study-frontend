import { Typography } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { IfDiv } from '../../Shared/IfDiv';
import './style.scss';

export const CaptureCamera = ({
  user,
  participant,
  isStudent,
  localAudioTrack,
  localVideoTrack,
  isLocal,
  localVideoCheck,
}) => {
  const userVideo = useRef();
  const userAudio = useRef();
  const [hasVideo, setHasVideo] = useState(false);
  // Criar aluno pra receber o peer e montar backend
  const attachTrack = (track) => {
    if (track.kind === 'audio') {
      track.attach(userAudio.current);
    }
    if (track.kind === 'video') {
      track.attach(userVideo.current);
      setHasVideo(true);
    }
  };
  useEffect(() => {
    if (participant) {
      participant.tracks.forEach((publication) => {
        if (
          publication.isSubscribed &&
          participant.identity !== user.username
        ) {
          const track = publication.track;
          attachTrack(track);
        }
        // publication.on('unsubscribed', unsubscribed);
      });

      participant.on('trackSubscribed', (track) => {
        attachTrack(track);
      });

      participant.on('trackUnsubscribed', (track) => {
        if (track.kind === 'video') {
          track.attach(userVideo.current);
          setHasVideo(false);
        }
      });
    }
  }, []);
  useEffect(() => {
    if (participant?.identity === user.name && localAudioTrack) {
      localAudioTrack.attach(userAudio.current);
    }
  }, [localAudioTrack]);
  useEffect(() => {
    if (participant?.identity === user.name && localVideoTrack) {
      localVideoTrack.attach(userVideo.current);
    }
  }, [localVideoTrack]);

  return (
    <div className='CaptureCamera-video-div-style'>
      {/* <audio></audio> */}
      <video
        className='CaptureCamera-video-adjusting'
        playsInline
        style={{
          display: hasVideo || (isLocal && localVideoCheck) ? 'block' : 'none',
        }}
        // width={150}
        // height={100}
        muted={true}
        ref={userVideo}
        autoPlay
      />
      <IfDiv condition={!(hasVideo || (isLocal && localVideoCheck))}>
        <div className='CaptureCamera-text-style'>
          <Typography>{participant?.identity}</Typography>
        </div>
      </IfDiv>
      <audio playsInline ref={userAudio} />
    </div>
  );
};
