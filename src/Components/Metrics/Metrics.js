import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import './Metrics.scss';
import QuestionMetric from './QuestionMetric.js';
import { AreaHeader } from '../../Shared/AreaHeader.js';

const Metrics = ({ socketConnection, classConnected }) => {
  return (
    <AreaHeader text='metrics'>
      <Scrollbars
        style={{ width: '100%', height: 'calc(100% - 12px)' }}
        autoHideTimeout={1000}
      >
        <QuestionMetric
          socketConnection={socketConnection}
          classConnected={classConnected}
        />
      </Scrollbars>
    </AreaHeader>
  );
};

export default Metrics;
