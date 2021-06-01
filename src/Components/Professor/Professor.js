import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { CaptureCamera } from '../VideoConference/CaptureCamera';
import { IfDiv } from '../../Shared/IfDiv';
import { USER_ROLES } from '../../Utils/constants';
import './Professor.scss';
import * as loginService from '../../Services/LoginService';
import * as professorService from '../../Services/ProfessorService';
import { connect, createLocalTracks } from 'twilio-video';

export const Professor = ({ socketConnection }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [professor, setProfessor] = useState();
  const [roomToken, setRoomToken] = useState();
  const [classId, setClassId] = useState();
  const [students, setStudents] = useState({});
  const [newTrack, setNewTrack] = useState();

  const createRoom = () => {
    if (roomToken) {
      createLocalTracks({
        audio: true,
        video: { width: 640 },
      }).then((localTracks) => {
        return connect(roomToken, {
          name: 'my-room-name',
          tracks: localTracks,
        }).then(
          (room) => {
            room.localParticipant.publishTracks(localTracks);
            console.log(`Successfully joined a Room: ${room}`);
            room.on('participantConnected', (participant) => {
              console.log(`A remote Participant connected: ${participant}`);
              participant.tracks.forEach((publication) => {
                if (publication.isSubscribed) {
                  const track = publication.track;
                  console.log(track.attach());

                  // document
                  //   .getElementById('remote-media-div')
                  //   .appendChild(track.attach());
                }
              });
              participant.on('trackSubscribed', (track) => {
                console.log(track.attach());
                console.log({ identity: participant.identity, track });
                setNewTrack({ identity: participant.identity, track });
                // document
                //   .getElementById('remote-media-div')
                //   .appendChild(track.attach());
              });
            });
          },
          (error) => {
            console.error(`Unable to connect to Room: ${error.message}`);
          },
        );
      });
    }
  };
  const initClass = () => {
    loginService.profile().then((result) => {
      const { data } = result;
      setProfessor(data);
      professorService.initClass(
        socketConnection,
        data._id,
        setClassId,
        setRoomToken,
      );
      setHasStarted(true);
    });
  };
  useEffect(() => {
    if (newTrack) {
      console.log(newTrack);
      const oldTrack = students[newTrack.identity] ?? [];
      setStudents({
        ...students,
        [newTrack.identity]: [...oldTrack, newTrack.track],
      });
    }
  }, [newTrack]);
  useEffect(createRoom, [roomToken]);

  return (
    <div className='Professor-camera-display'>
      {/* <Chat socketConnection={socketConnection} user={user}></Chat> */}
      <IfDiv condition={!hasStarted}>
        <Button
          color='primary'
          onClick={() => {
            initClass();
          }}
        >
          <FormattedMessage id='initClass' />
        </Button>
      </IfDiv>
      <IfDiv condition={hasStarted}>
        <CaptureCamera
          started={hasStarted}
          socket={socketConnection}
          userClass={USER_ROLES.PROFESSOR}
          user={professor}
          classId={classId}
          cameras={students}
        />
      </IfDiv>
    </div>
  );
};
