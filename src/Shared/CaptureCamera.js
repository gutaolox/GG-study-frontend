import React from 'react';
import VideoRecorder from 'react-video-recorder';

export const CaptureCamera = () => {
  return (
    <VideoRecorder
      chunkSize={250}
      constraints={{
        audio: true,
        video: true,
      }}
      style={{ height: 500, width: 500 }}
      //   countdownTime={3000}
      //   dataAvailableTimeout={500}
      //   isFlipped
      //   mimeType={undefined}
      //   onError={function noRefCheck() {}}
      //   onOpenVideoInput={function noRefCheck() {}}
      //   onRecordingComplete={function noRefCheck() {}}
      //   onStartRecording={function noRefCheck() {}}
      //   onStopRecording={function noRefCheck() {}}
      //   onStopReplaying={function noRefCheck() {}}
      //   onTurnOffCamera={function noRefCheck() {}}
      //   onTurnOnCamera={function noRefCheck() {}}
      //   renderActions={function noRefCheck() {}}
      //   renderDisconnectedView={function noRefCheck() {}}
      //   renderErrorView={function noRefCheck() {}}
      //   renderLoadingView={function noRefCheck() {}}
      //   renderUnsupportedView={function noRefCheck() {}}
      //   renderVideoInputView={function noRefCheck() {}}
      //   timeLimit={undefined}
    />
  );
};
