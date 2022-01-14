import React, { useState, useEffect, useCallback } from "react";
import { Navbar } from "Components";

import { useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import {
  fetchNames,
  getUnseenNotificationsCount,
  seeNotifications,
  logout,
  getNotifications,
} from "queries";

export default function NavbarContainer() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const socket = useSelector((state) => state.socket);
  const { _id } = user;
  const [searchNames, setSearchNames] = useState(null);
  const [showNames, setShowNames] = useState(false);
  const [notifications, setNotifications] = useState(null);
  const [unseenNotificationCount, setUnseenNotificationCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  const getNotificationCount = useCallback(async () => {
    const data = await getUnseenNotificationsCount();
    data && setUnseenNotificationCount(data.notificationCount);
  }, [getUnseenNotificationsCount, setUnseenNotificationCount]);

  const unshowNotifications = useCallback(
    () => setShowNotifications(false),
    [setShowNotifications]
  );

  const handleNotificationClick = useCallback(async () => {
    const { status } = await seeNotifications();
    if (status) {
      setUnseenNotificationCount(0);
      const data = await getNotifications();
      if (data) {
        setShowNotifications(true);
        setNotifications(data);
      }
    }
  }, [
    seeNotifications,
    getNotifications,
    setUnseenNotificationCount,
    setShowNotifications,
    setNotifications,
  ]);

  let fetchNamesHandler = useCallback(
    async (name) => {
      const data = await fetchNames(name);
      data && setSearchNames(data);
    },
    [fetchNames, setSearchNames]
  );

  let logoutHandler = useCallback(async () => {
    const { status } = await logout();
    dispatch({ type: "LOGOUT" });
    status && history.push("/");
  }, [logout, dispatch, history]);

  const showNamesList = useCallback(() => setShowNames(true), [setShowNames]);
  const hideNamesList = useCallback(() => setShowNames(false), [setShowNames]);
  const onSearchChange = useCallback(
    (e) => fetchNamesHandler(e.target.value),
    [fetchNamesHandler]
  );

  const removeSearchResults = useCallback(() => {
    setSearchNames(null);
    setShowNames(false);
  }, [setShowNames, setSearchNames]);

  useEffect(() => {
    getNotificationCount();
    socket.on("changes", (data) => {
      setUnseenNotificationCount(
        (unseenNotificationCount) => unseenNotificationCount + 1
      );
    });
  }, [getNotificationCount, setUnseenNotificationCount]);

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
      removeSearchResults={removeSearchResults}
      onSearchChange={onSearchChange}
      unshowNotifications={unshowNotifications}
    />
  );
}
