import React, { useEffect, useRef } from 'react';
import './style.scss';

export const CaptureCamera = ({ user, participant, isStudent }) => {
  const userVideo = useRef();
  const userAudio = useRef();
  // Criar aluno pra receber o peer e montar backend
  useEffect(() => {
    console.log(`teste Varias vezes o mesmo ${participant.identity}`);
    participant.tracks.forEach((publication) => {
      console.log(publication.isSubscribed);
      if (publication.isSubscribed || participant.identity === user.username) {
        const track = publication.track;
        if (track.kind === 'audio') {
          track.attach(userAudio.current);
        }
        if (track.kind === 'video') {
          track.attach(userVideo.current);
        }
      }
      publication.on('subscribed', (track) => {
        console.log(track);
        /* Hide the avatar image and show the associated <video> element. */
      });
      publication.on('unsubscribed', (track) => {
        console.log(track);
        /* Hide the avatar image and show the associated <video> element. */
      });
    });

    participant.on('trackSubscribed', (track) => {
      if (track.kind === 'audio') {
        track.attach(userAudio.current);
      }
      if (track.kind === 'video') {
        track.attach(userVideo.current);
      }
    });
  }, []);

  return (
    <div className='CaptureCamera-video-div-style'>
      {/* <audio></audio> */}
      {/* <IfDiv condition={isStudent}> */}
      <video
        className='CaptureCamera-video-adjusting'
        playsInline
        height={150}
        muted={true}
        ref={userVideo}
        autoPlay
      />
      {/* </IfDiv> */}
      <audio playsInline ref={userAudio} />
    </div>
  );
};
