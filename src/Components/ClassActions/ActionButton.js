import { Button } from '@material-ui/core';
import React from 'react';

const ActionButton = ({ action, children }) => {
  return (
    <div className='ActionButton-button'>
      <Button onClick={action}>{children}</Button>
    </div>
  );
};

export default ActionButton;
