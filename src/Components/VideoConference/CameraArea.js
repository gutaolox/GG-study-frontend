import React, { useEffect, useState } from 'react';
import {
  connect,
  createLocalAudioTrack,
  createLocalTracks,
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
  const [muted, setMuted] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);

  const unmuteVideo = () => {
    if (roomToken) {
      createLocalVideoTrack({
        width: 640,
      }).then((localTracks) => {
        localParticipant.publishTracks(localTracks);
      });
    }
  };
  const unmuteAudio = () => {
    if (roomToken) {
      createLocalAudioTrack().then((localTracks) => {
        localParticipant.publishTracks(localTracks);
      });
    }
  };

  const muteVideo = () => {
    localParticipant.videoTracks.forEach((publication) => {
      publication.track.stop();
      publication.unpublish();
    });
  };

  const muteAudio = () => {
    localParticipant.audioTracks.forEach((publication) => {
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
          setLocalParticipant(room.localParticipant);
          setParticipantsControl([
            room.localParticipant,
            ...room.participants.values(),
          ]);
          console.log(`Successfully joined a Room: ${room}`);
          room.on('participantConnected', (participant) => {
            console.log(`A remote Participant connected: ${participant}`);
            setParticipantsControl([
              room.localParticipant,
              ...room.participants.values(),
            ]);
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
      console.log(user);
      if (user.role === 'Professor') {
        professorService.initClass(socket, user._id, setRoomToken);
      } else {
        classService.addStudent(socket, studentClass, user._id, setRoomToken);
      }
    }
  };

  useEffect(createRoom, [roomToken]);
  useEffect(initClass, [user]);
  return (
    <div>
      <div className='CameraArea-cameras-display'>
        {participantsControl.map((participant, index) => {
          return (
            <CaptureCamera
              key={index}
              participant={participant}
              isStudent={user.role === 'Student'}
              user={user}
            />
          );
        })}
      </div>
      <ConferenceMenu />
    </div>
  );
};
