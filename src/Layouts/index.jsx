import React, { useState, useEffect, memo } from 'react';
import { Footer, Container, FAB } from 'Components';
import { Chat, Navbar } from 'Containers';

import MessageIcon from '@material-ui/icons/Message';
import ClearIcon from '@material-ui/icons/Clear';

import { classNames } from 'utils';

import { useDispatch, useSelector } from 'react-redux';

import socketClient from 'socket.io-client';
import styles from './Layout.module.scss';

const Layout = memo(({ children, useGutter = true }) => {
  const [showChat, setShowChat] = useState(false);
  const socket = useSelector((state) => state.socket);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const socketInstance = socketClient('http://localhost:7000/', {
      withCredentials: true,
    });
    socketInstance.emit('joinRoom', { id: user._id });
    dispatch({ type: 'SET_SOCKET', payload: socketInstance });
  }, [user._id, dispatch]);

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
          <FAB
            variant="filled"
            onClick={() => setShowChat((prevShowChat) => !prevShowChat)}
          >
            {showChat ? <ClearIcon /> : <MessageIcon />}
          </FAB>
        </div>
      </div>
    )
  );
});

export default Layout;
