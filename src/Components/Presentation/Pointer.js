import React, { useEffect, useRef, useState } from 'react';
import './Presentation.scss';
import * as classService from '../../Services/ClassService';

export const Pointer = ({ classConnected, socket, maxWidth, maxHeight }) => {
  const canvasControl = useRef();
  const [coordinates, setCoordinates] = useState();
  const drawPoint = (x, y) => {
    const context = canvasControl.current.getContext('2d');
    if (context) {
      context.beginPath();
      context.clearRect(0, 0, maxWidth, maxHeight);
      context.arc(x, y, 7, 0, Math.PI * 2, false);
      context.fill();
    }
  };

  useEffect(() => {
    if (socket && classConnected.isStudent) {
      classService.listenPointer(socket, setCoordinates);
    }
  }, [socket]);

  useEffect(() => {
    if (coordinates && maxHeight && maxWidth) {
      drawPoint(
        coordinates.x * (maxWidth / coordinates.xMax),
        coordinates.y * (maxHeight / coordinates.yMax),
      );
    }
  }, [coordinates]);

  return (
    <canvas
      className='Pointer-Canvas-Organization'
      height={maxHeight}
      width={maxWidth}
      ref={canvasControl}
    />
  );
};
