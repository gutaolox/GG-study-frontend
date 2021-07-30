import React from 'react';

export const IfDiv = ({ condition, children, className }) => {
  if (condition) {
    return <div className={className}>{children}</div>;
  } else {
    return null;
  }
};
