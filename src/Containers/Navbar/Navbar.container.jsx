import React, { useState, useEffect } from "react";
import { Navbar } from "Components";

import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";

import {
  fetchNames,
  getUnseenNotificationsCount,
  seeNotifications,
  logout,
  getNotifications,
} from "queries";

export default function NavbarContainer() {
  const history = useHistory();

  const user = useSelector((state) => state.user);
  const socket = useSelector((state) => state.socket);
  const { _id } = user;
  const [searchNames, setSearchNames] = useState(null);
  const [showNames, setShowNames] = useState(false);
  const [notifications, setNotifications] = useState(null);
  const [unseenNotificationCount, setUnseenNotificationCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  const getNotificationCount = async () => {
    const data = await getUnseenNotificationsCount();
    data && setUnseenNotificationCount(data.notificationCount);
  };

  const unshowNotifications = () => setShowNotifications(false);

  const handleNotificationClick = async () => {
    const { status } = await seeNotifications();
    if (status) {
      setUnseenNotificationCount(0);
      const data = await getNotifications();
      if (data) {
        setShowNotifications(true);
        setNotifications(data);
      }
    }
  };

  let fetchNamesHandler = async (name) => {
    const data = await fetchNames(name);
    data && setSearchNames(data);
  };

  let logoutHandler = async () => {
    const { status } = await logout();
    status && history.push("/");
  };

  const showNamesList = () => setShowNames(true);
  const hideNamesList = () => setShowNames(false);
  const onSearchChange = (e) => fetchNamesHandler(e.target.value);

  useEffect(() => {
    getNotificationCount();
    socket.on("changes", (data) => {
      console.log("Yo boi");
      setUnseenNotificationCount(
        (unseenNotificationCount) => unseenNotificationCount + 1
      );
    });
  }, []);
  return (
    <Navbar
      user={user}
      searchNames={searchNames}
      showNames={showNames}
      notifications={notifications}
      unseenNotificationCount={unseenNotificationCount}
      showNotifications={showNotifications}
      logout={logoutHandler}
      handleNotificationClick={handleNotificationClick}
      showNamesList={showNamesList}
      hideNamesList={hideNamesList}
      onSearchChange={onSearchChange}
      unshowNotifications={unshowNotifications}
    />
  );
}
