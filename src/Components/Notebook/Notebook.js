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
    console.log('notifications', notifications);
    notificationsEndRef?.current?.scrollToBottom();
  }, [notifications]);

  useEffect(() => {
    notebookService.getNotificationsByClass(setNotifications);
  }, []);

  return (
    <AreaHeader text='notebook'>
      <div className='Notebook-notifications-display'>
        <Scrollbars
          style={{ width: '100%', height: '300%' }}
          autoHideTimeout={1000}
          ref={notificationsEndRef}
        >
          {notifications
            // .sort((a, b) =>
            //   a.timeReleased < b.timeReleased
            //     ? -1
            //     : a.timeReleased > b.timeReleased
            //     ? 1
            //     : 0,
            // )
            .map((notification, index) => (
              <Notification key={index} notification={notification} />
            ))}
        </Scrollbars>
      </div>
    </AreaHeader>
  );
};

export default Notebook;
