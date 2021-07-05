import React from 'react';
import { FormattedMessage } from 'react-intl';
import './style.scss';

export const AreaHeader = ({ text, children }) => {
  return (
    <div style={{ height: '100%' }}>
      <div className='area-header-main-container'>
        <FormattedMessage id={text} />
      </div>
      <div className='area-header-children-container'>{children}</div>
    </div>
  );
};
