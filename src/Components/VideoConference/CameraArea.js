import React, { useEffect, useState } from 'react';
import {
  connect,
  createLocalAudioTrack,
  createLocalVideoTrack,
} from 'twilio-video';
import * as professorService from '../../Services/ProfessorService';
import './style.scss';
import * as classService from '../../Services/ClassService';
import { CaptureCamera } from './CaptureCamera';
import { ConferenceMenu } from './ConferenceMenu';

export const CameraArea = ({ socket, user, studentClass }) => {
  const [roomToken, setRoomToken] = useState();
  const [participantsControl, setParticipantsControl] = useState([]);
  const [localParticipant, setLocalParticipant] = useState();
  const [muted, setMuted] = useState(true);
  const [hasVideo, setHasVideo] = useState(false);
  const [localAudioTrack, setLocalAudioTrack] = useState();
  const [localVideoTrack, setLocalVideoTrack] = useState();

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
    if (roomToken) {
      return connect(roomToken, {
        name: 'my-room-name',
      }).then(
        (room) => {
          console.log(`Successfully joined a Room: ${room}`);
          setLocalParticipant(room.localParticipant);
          closeVideo(room.localParticipant);
          muteAudio(room.localParticipant);
          setParticipantsControl([...room.participants.values()]);
          room.on('participantConnected', (participant) => {
            console.log(`A remote Participant connected: ${participant}`);

            setParticipantsControl([...room.participants.values()]);
          });
          window.addEventListener('beforeunload', () => {
            room.disconnect();
          });
          window.addEventListener('unload', () => {
            room.disconnect();
          });
          window.addEventListener('close', () => {
            room.disconnect();
          });
          room.on('participantDisconnected', (participant) => {
            console.log(`Successfully disconnected a Room: ${participant}`);
            setParticipantsControl([...room.participants.values()]);
          });
        },
        (error) => {
          console.error(`Unable to connect to Room: ${error.message}`);
        },
      );
    }
  };
  const initClass = () => {
    if (user) {
      if (user.role === 'Professor') {
        professorService.initClass(socket, user._id, setRoomToken);
      } else {
        classService.addStudent(socket, studentClass, user._id, setRoomToken);
      }
    }
  };

  const LocalParticipantComponent = () => {
    if (user) {
      return (
        <CaptureCamera
          localAudioTrack={localAudioTrack}
          localVideoTrack={localVideoTrack}
          participant={localParticipant}
          isStudent={user.role === 'Student'}
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
  useEffect(initClass, [user]);
  return (
    <div className='CameraArea-main-organization'>
      <div className='CameraArea-cameras-display'>
        <LocalParticipantComponent />
        {participantsControl.map((participant, index) => {
          return (
            <CaptureCamera
              key={index}
              participant={participant}
              isStudent={user.role === 'Student'}
              user={user}
              isLocal={false}
            />
          );
        })}
      </div>
      <ConferenceMenu
        muted={muted}
        hasVideo={hasVideo}
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
