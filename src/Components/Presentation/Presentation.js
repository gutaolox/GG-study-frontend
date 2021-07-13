import React, { useEffect, useRef, useState } from 'react';
import * as classService from '../../Services/ClassService';
import './Presentation.scss';

const Presentation = ({
  socketConnection,
  classConnected,
  initialPage,
  totalPages,
}) => {
  const [images, setImages] = useState('');
  const [page, setPage] = useState(initialPage);
  const controlRef = useRef();
  console.log(totalPages, initialPage);
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
        const xCoordinates = event.clientX - event.currentTarget.offsetLeft;
        if (xCoordinates >= referenceNumber) {
          setPage((page % totalPages) + 1);
        } else {
          setPage((page % totalPages) - 1);
        }
      }}
      ref={controlRef}
      className='presentation-container'
    >
      <img
        src={`data:image/jpg;base64, ${images}`}
        className='presentation-image'
      />
    </div>
  );
};

export default Presentation;
