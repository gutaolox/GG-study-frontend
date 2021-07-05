import React, { useEffect, useState } from 'react';
import {
  connect,
  createLocalAudioTrack,
  createLocalVideoTrack,
} from 'twilio-video';

import './style.scss';
import { CaptureCamera } from './CaptureCamera';
import { ConferenceMenu } from './ConferenceMenu';
import { USER_ROLES } from '../../Utils/constants';

const CameraArea = ({
  user,
  roomToken,
  closeRoom,
  setCloseRoom,
  throwError,
}) => {
  const [participantsControl, setParticipantsControl] = useState([]);
  const [localParticipant, setLocalParticipant] = useState();
  const [muted, setMuted] = useState(true);
  const [hasVideo, setHasVideo] = useState(false);
  const [localAudioTrack, setLocalAudioTrack] = useState();
  const [localVideoTrack, setLocalVideoTrack] = useState();
  const [connected, setConnected] = useState();
  const [roomHook, setRoomHook] = useState();

  const openVideo = () => {
    if (roomToken) {
      createLocalVideoTrack().then((localTrack) => {
        setLocalVideoTrack(localTrack);
        return localParticipant.publishTrack(localTrack);
      });
    }
  };
  const unmuteAudio = () => {
    if (roomToken) {
      createLocalAudioTrack().then((localTrack) => {
        setLocalAudioTrack(localTrack);
        return localParticipant.publishTrack(localTrack);
      });
    }
  };

  const closeVideo = (participant) => {
    participant.videoTracks.forEach((publication) => {
      publication.track.stop();
      publication.unpublish();
    });
  };

  const muteAudio = (participant) => {
    participant.audioTracks.forEach((publication) => {
      publication.track.stop();
      publication.unpublish();
    });
  };
  // Criar aluno pra receber o peer e montar backend
  const createRoom = () => {
    // setTimeout(() => {
    //   if (!connected) {
    //     throwError('timeoutPermission');
    //     setCloseRoom(true);
    //   }
    // }, 10000);
    if (roomToken) {
      return connect(roomToken, {
        name: 'my-room-name',
      }).then(
        (room) => {
          console.log(`Successfully joined a Room: ${room}`);
          setLocalParticipant(room.localParticipant);
          setRoomHook(room);
          closeVideo(room.localParticipant);
          muteAudio(room.localParticipant);
          setParticipantsControl([...room.participants.values()]);
          setConnected(true);
          room.on('participantConnected', (participant) => {
            console.log(`A remote Participant connected: ${participant}`);
            setParticipantsControl([...room.participants.values()]);
          });
          window.addEventListener('beforeunload', () => {
            setConnected(false);
            room.disconnect();
          });
          window.addEventListener('unload', () => {
            setConnected(false);
            room.disconnect();
          });
          window.addEventListener('close', () => {
            setConnected(false);
            room.disconnect();
          });
          room.on('participantDisconnected', (participant) => {
            console.log(`Successfully disconnected a Room: ${participant}`);
            setParticipantsControl([...room.participants.values()]);
          });
        },
        (error) => {
          throwError('errorCamera');
          setCloseRoom(true);
          console.error(`Unable to connect to Room: ${error.message}`);
        },
      );
    }
  };

  const LocalParticipantComponent = () => {
    if (user) {
      return (
        <CaptureCamera
          localAudioTrack={localAudioTrack}
          localVideoTrack={localVideoTrack}
          participant={localParticipant}
          isStudent={user.role === USER_ROLES.STUDENT}
          user={user}
          isLocal={true}
          localVideoCheck={hasVideo}
        />
      );
    } else {
      return null;
    }
  };
  useEffect(createRoom, [roomToken]);
  useEffect(() => {
    if (closeRoom) {
      roomHook?.disconnect();
    }
  }, [closeRoom]);

  return (
    <div className='CameraArea-main-organization'>
      <div className='CameraArea-cameras-display'>
        <LocalParticipantComponent />
        {participantsControl.map((participant, index) => {
          return (
            <CaptureCamera
              key={index}
              participant={participant}
              isStudent={user.role === USER_ROLES.STUDENT}
              user={user}
              isLocal={false}
            />
          );
        })}
      </div>
      <ConferenceMenu
        muted={muted}
        hasVideo={hasVideo}
        connected={connected}
        setHasVideo={(newVideoState) => {
          if (newVideoState) {
            openVideo();
          } else {
            closeVideo(localParticipant);
          }
          setHasVideo(newVideoState);
        }}
        setMuted={(newAudioState) => {
          if (newAudioState) {
            muteAudio(localParticipant);
          } else {
            unmuteAudio();
          }
          setMuted(newAudioState);
        }}
      />
    </div>
  );
};
export default CameraArea;
