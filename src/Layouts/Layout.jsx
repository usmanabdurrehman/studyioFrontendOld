import React, { useState, useEffect } from "react";
import styles from "./Layout.module.scss";
import { Footer, Container, FAB, Chat } from "Components";

import MessageIcon from "@material-ui/icons/Message";
import ClearIcon from "@material-ui/icons/Clear";

import { Navbar } from "Containers";

import { classNames } from "utils";

import { useDispatch, useSelector } from "react-redux";

import socketClient from "socket.io-client";

export default function Layout({ children, useGutter = true }) {
  let [showChat, setShowChat] = useState(false);
  const socket = useSelector((state) => state.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Yo boi");
    const socketInstance = socketClient("http://localhost:7000/", {
      withCredentials: true,
    });
    socketInstance.emit("joinRoom", { id: user._id });
    dispatch({ type: "SET_SOCKET", payload: socketInstance });
  }, []);

  const user = useSelector((state) => state.user);

  return (
    socket && (
      <div className={styles.layoutWrapper}>
        <Navbar />
        <Container
          classes={{
            container: classNames({
              [styles.layoutBody]: true,
              [styles.gutter]: useGutter,
            }),
          }}
        >
          {children}
        </Container>
        <Footer />
        <div className={styles.fabWrapper}>
          <div
            className={classNames({
              [styles.chatWrapper]: true,
              [styles.openChat]: showChat,
            })}
          >
            <Chat />
          </div>
          <FAB variant="filled" onClick={(e) => setShowChat(!showChat)}>
            {showChat ? <ClearIcon /> : <MessageIcon />}
          </FAB>
        </div>
      </div>
    )
  );
}
