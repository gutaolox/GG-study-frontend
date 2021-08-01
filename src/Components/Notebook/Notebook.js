import React, { useState, useEffect, useRef } from 'react';
import * as notebookService from '../../Services/NotebookService.js';
import { Scrollbars } from 'react-custom-scrollbars';
import { AreaHeader } from '../../Shared/AreaHeader.js';
import { Notification } from './Notification.js';
import './Notebook.scss';

const Notebook = ({ socketConnection, classConnected }) => {
  const notificationsEndRef = useRef(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    notificationsEndRef?.current?.scrollToTop();
  }, [notifications]);

  useEffect(() => {
    notebookService.getNotificationsByClass(
      socketConnection,
      classConnected.classId,
      setNotifications,
    );
  }, []);

  return (
    <AreaHeader text='notebook'>
      <div className='Notebook-notifications-display'>
        <Scrollbars
          style={{ width: '100%', height: 'calc(100% - 12px)' }}
          autoHideTimeout={1000}
          ref={notificationsEndRef}
        >
          {notifications
            .sort((a, b) =>
              a.timeReleased
                .toString()
                .localeCompare(b.timeReleased.toString()),
            )
            .map((notification) => (
              <Notification
                key={notification._id}
                notification={notification}
                socketConnection={socketConnection}
                classConnected={classConnected}
                setterNotification={setNotifications}
              />
            ))}
        </Scrollbars>
      </div>
    </AreaHeader>
  );
};

export default Notebook;
