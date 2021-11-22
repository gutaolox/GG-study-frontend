import React, { useEffect, useRef, useState } from 'react';
import * as classService from '../../Services/ClassService';
import { Pointer } from './Pointer';
import './Presentation.scss';

const Presentation = ({
  socketConnection,
  classConnected,
  initialPage,
  totalPages,
}) => {
  const [images, setImages] = useState('');
  const [page, setPage] = useState(initialPage);
  const [sendPosition, setSendPosition] = useState(true);
  const controlRef = useRef();
  const getPage = (selectedPage) => {
    classService
      .getSlide(
        classConnected.idClass || '60dd02372edf90240c54dde6',
        selectedPage,
      )
      .then((result) => {
        const { data } = result;
        setImages(data);
      });
  };

  const getEventCoordinates = (event) => {
    return {
      x: event.clientX - controlRef.current.offsetLeft,
      y: event.clientY - controlRef.current.offsetTop,
    };
  };

  useEffect(() => {
    if (page) {
      getPage(page);
      if (!classConnected.isStudent) {
        classService.updatePage(
          socketConnection,
          classConnected.idClass || '60dd02372edf90240c54dde6',
          page,
        );
      }
    }
  }, [page]);

  useEffect(() => {
    setPage(initialPage);
    if (classConnected.isStudent) {
      classService.pageListener(socketConnection, setPage);
    }
  }, [initialPage]);

  return (
    <div
      onClick={(event) => {
        const referenceNumber = controlRef.current.offsetWidth / 2;
        const coordinates = getEventCoordinates(event);
        if (coordinates.x >= referenceNumber) {
          setPage((page % totalPages) + 1);
        } else {
          setPage(Math.abs((page % totalPages) - 1));
        }
      }}
      onMouseMove={(event) => {
        if (sendPosition && !classConnected.isStudent) {
          setSendPosition(false);
          setTimeout(
            () => {
              const coordinates = getEventCoordinates(event);
              classService.sendPointer(
                socketConnection,
                coordinates.x,
                coordinates.y,
                controlRef.current.offsetWidth,
                controlRef.current.offsetHeight,
              );
              setSendPosition(true);
            },
            200,
            event,
          );
        }
      }}
      ref={controlRef}
      className='presentation-container'
    >
      <Pointer
        classConnected={classConnected}
        socket={socketConnection}
        maxHeight={controlRef.current?.offsetHeight}
        maxWidth={controlRef.current?.offsetWidth}
      />
      <img
        src={`data:image/jpg;base64, ${images}`}
        className='presentation-image'
      />
    </div>
  );
};

export default Presentation;
