import React, { useState, useEffect, useRef } from 'react';
import * as notebookService from '../../Services/NotebookService.js';
import { Scrollbars } from 'react-custom-scrollbars';
import { AreaHeader } from '../../Shared/AreaHeader.js';
import { Notification } from './Notification.js';
import './Notebook.scss';

const Notebook = ({ socketConnection, classConnected, roomToken }) => {
  const notificationsEndRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const [questionControl, setQuestionControl] = useState(0);
  useEffect(() => {
    notificationsEndRef?.current?.scrollToTop();
  }, [notifications]);

  useEffect(() => {
    if (roomToken) {
      notebookService.getNotificationsByClass(
        socketConnection,
        classConnected.classId,
        classConnected.user._id,
        setNotifications,
        setQuestionControl,
      );
    }
  }, [roomToken]);
  return (
    <AreaHeader text='notebook'>
      <div className='Notebook-notifications-display'>
        <Scrollbars
          style={{ width: '100%', height: 'calc(100% - 12px)' }}
          autoHideTimeout={1000}
          ref={notificationsEndRef}
        >
          {notifications?.length ? (
            <Notification
              key={notifications[questionControl]._id}
              notification={notifications[questionControl]}
              socketConnection={socketConnection}
              classConnected={classConnected}
              setterNotification={setNotifications}
              nextQuestion={() => {
                if (questionControl !== notifications.length - 1) {
                  setQuestionControl(questionControl + 1);
                }
              }}
            />
          ) : null}
        </Scrollbars>
      </div>
    </AreaHeader>
  );
};

export default Notebook;
