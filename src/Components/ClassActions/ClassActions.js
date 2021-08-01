import React from 'react';
import { FormattedMessage } from 'react-intl';
import { AreaHeader } from '../../Shared/AreaHeader';
import ActionButton from './ActionButton';
import './ClassActions.scss';

const ClassActions = ({ socket, classConnected }) => {
  return (
    <AreaHeader text='classActions'>
      <div className='ClassAction-button-organization'>
        <ActionButton action={() => console.log('click Button 1')}>
          <FormattedMessage id='blockPointer' />
        </ActionButton>
        <ActionButton action={() => console.log('TODO')}>
          <FormattedMessage id='releaseExercise' />
        </ActionButton>
      </div>
    </AreaHeader>
  );
};

export default ClassActions;
