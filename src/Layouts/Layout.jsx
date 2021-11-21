import React, { useState } from "react";
import styles from "./Layout.module.scss";
import { Footer, Container, FAB, Chat } from "Components";
import MessageIcon from "@material-ui/icons/Message";
import { Navbar } from "Containers";

import { classNames } from "utils";

import { useSelector } from "react-redux";

export default function Layout({ children, useGutter = true }) {
  let [showChat, setShowChat] = useState(false);
  const socket = useSelector((state) => state.socket);
  const user = useSelector((state) => state.user);
  socket.emit("joinRoom", { id: user._id });

  return (
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
          <MessageIcon />
        </FAB>
      </div>
    </div>
  );
}
