import React, { useState, useEffect } from "react";
import Dropdown from './Dropdown';
import { router } from '@inertiajs/react'
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Bell = ({user, notificationList}) => {
  const [notifications, setNotifications] = useState(notificationList);
  const [unreadCount, setUnreadCount] = useState(notificationList ? notificationList.length : 0);

  const notificationSound = new Audio('/assets/notification_sound.mp3');

  useEffect(() => {
      Echo.leave('App.Models.User.' + user['id']);
      Echo.private('App.Models.User.' + user['id'])
      .notification((notification) => {
          // notificationSound.play();
          toast.info(
          <><div className="font-bold"> {notification.data.title} </div><div> {notification.data.body} </div></>,
          {
            icon: <FontAwesomeIcon icon={'bell'} />,
            position: "bottom-right",
            autoClose: 5000,
            containerId: "notifications",
          })
          setUnreadCount((previousCount) => previousCount + 1);
          setNotifications((previousNotifications) => [notification, ...previousNotifications]);
      });
  }, []);

  const readNotificationAll = async () => {
    await router.post(route('notification.read.all'))
    setUnreadCount(0);
    setNotifications([]);
  }
  const readNotification = async (id, link) => {
    await router.post(route('notification.read',id));
    setUnreadCount((previousCount) => previousCount - 1);
    setNotifications(notifications.filter((notification) => notification.id !== id));
  }

  return (
    <div className="relative m-1 w-fit">
      <ToastContainer
        enableMultiContainer
        containerId={"notifications"}
        pauseOnFocusLoss
      />
      <Dropdown>
        <Dropdown.Trigger>
          <div
              className={unreadCount > 0 ? "absolute bottom-auto left-auto right-0 top-0 z-10 -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center " : ""}><div className="absolute text-xs">{unreadCount > 0 ? unreadCount : ""}</div></div>
          <div
              className="flex items-center justify-center rounded-lg bg-gray-400 px-1 py-1 text-center text-white shadow-lg dark:text-gray-200 hover:cursor-pointer">
              <svg
              xmlns="https://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5">
              <path
                  fillRule="evenodd"
                  d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                  clipRule="evenodd" />
              </svg>
          </div>
        </Dropdown.Trigger>

        <Dropdown.Content contentClasses="py-1 bg-white w-96 h-80 overflow-auto" alignment="right-20">
            <div className="flex justify-between m-2">
              <a href={route('notification.list')} className="no-underline hover:underline px-2 text-blue-400">Notifications</a>
              <a href="#" className="no-underline hover:underline px-2 text-blue-400" onClick={() => {readNotificationAll()}}>Mark all as Read</a>
            </div>
            <hr />
            {notifications && notifications.length > 0 ?

            notifications.map((notification, index) => (
              <div key={index} onClick={() => {readNotification(notification.id, notification.data.link)}}>
                  <div className="flex flex-col w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out hover:cursor-pointer">
                    <div className="font-bold">{notification.data.title}</div>
                    <div>{notification.data.body}</div>
                    <div>{moment(notification.created_at).fromNow()}</div>
                  </div>
                <hr />
              </div>
            )) :
            <div className="p-24 text-left text-sm">No Unread Notifications...</div>
            }
        </Dropdown.Content>
    </Dropdown>

    </div>
  );
};

export default Bell;
