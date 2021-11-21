import React, { useState, useEffect, useRef } from "react";
import styles from "./Chat.module.scss";

import SwipeableViews from "react-swipeable-views";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import { fetchNames } from "queries";

import { getProfileImageURL } from "utils";

import { service } from "services";

import { useSelector } from "react-redux";

import CircularProgress from "@material-ui/core/CircularProgress";

export default function Chat() {
  const socket = useSelector((state) => state.socket);
  const user = useSelector((state) => state.user);
  const { _id } = user;
  let [messages, setMessages] = useState([
    {
      content: "Hi there, how can I help you?",
      sender: "own",
    },
  ]);

  const [searchNames, setSearchNames] = useState(null);
  const [conversations, setConversations] = useState(null);
  let fetchNamesHandler = async (name) => {
    const data = await fetchNames(name);
    data && setSearchNames(data);
  };

  const onSearchChange = (e) => {
    const value = e.target.value;
    value ? fetchNamesHandler(e.target.value) : setSearchNames(null);
  };

  const [index, setIndex] = useState(0);

  const messagesContainer = useRef(null);

  let [message, setMessage] = useState("");
  const [openedChat, setOpenedChat] = useState();

  let appendMessage = (e) => {
    e.preventDefault();
  };

  const startConversation = async (profile) => {
    service({
      url: "/user/conversations",
      method: "post",
      data: { id: profile._id },
    }).then((res) => {
      const { status, conversation } = res.data;
      status && openConversation(conversation._id);
    });
  };

  const openConversation = (id) => {
    service({
      url: `/user/conversations/${id}`,
    }).then((res) => {
      const { status, conversation } = res.data;
      if (status) {
        setOpenedChat(conversation);
        setIndex(1);
      }
    });
  };

  const getAllConversations = () => {
    service({
      url: `/user/conversations`,
    }).then((res) => {
      const { status, conversations } = res.data;
      status && setConversations(conversations);
    });
  };

  useEffect(() => {
    !index && getAllConversations();
  }, [index]);

  const sendMessage = () => {
    socket.emit("");
  };

  useEffect(() => {
    socket.on("changes", (data) => {
      setMessages((messages) => [...messages, data]);
    });
  }, []);

  useEffect(() => {
    socket.emit("leaveRoom", { id: "2" });
    socket.emit("joinRoom", { id: "2" });
  }, [openedChat]);

  useEffect(() => {
    if (messagesContainer.current) {
      messagesContainer.current.scrollTo({
        left: 0,
        top: messagesContainer.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className={styles.chat}>
      <div className={styles.chatHeader}>
        {index ? "Usama" : "Inbox"}
        {index ? (
          <ArrowBackIosIcon
            className={styles.arrowBackward}
            onClick={(e) => setIndex(0)}
          />
        ) : (
          <ArrowForwardIosIcon
            className={styles.arrowForward}
            onClick={(e) => setIndex(1)}
          />
        )}
      </div>
      <SwipeableViews
        index={index}
        style={{ height: "100%" }}
        containerStyle={{ height: "100%" }}
      >
        <div>
          <div className={styles.searchWrapper}>
            <input
              placeholder="Search..."
              className={styles.search}
              onChange={onSearchChange}
            />
            {conversations && (
              <div className={styles.nameList}>
                {conversations.map((conversation) => {
                  const {
                    _id: id,
                    name,
                    profileImage,
                  } = conversation.participants.find(
                    (participant) => participant._id !== _id
                  );
                  return (
                    <div onClick={() => openConversation(id)}>
                      <img
                        src={getProfileImageURL(profileImage)}
                        alt=""
                        className={styles.searchImage}
                      />
                      <div className={styles.searchName}>{name}</div>
                    </div>
                  );
                })}
              </div>
            )}
            {searchNames && (
              <div className={styles.nameList}>
                {searchNames.map(({ name, _id, profileImage }) => (
                  <div
                    onClick={() =>
                      startConversation({ _id, name, profileImage })
                    }
                  >
                    <img
                      src={getProfileImageURL(profileImage)}
                      alt=""
                      className={styles.searchImage}
                    />
                    <div className={styles.searchName}>{name}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={styles.chatWrapper}>
          <div className={styles.chatMessages} ref={messagesContainer}>
            {messages.map(({ content, sender }) => (
              <div
                className={`${styles.chatMessage} ${
                  sender == "own" ? styles.ownMessage : styles.notOwnMessage
                }`}
              >
                {content}
              </div>
            ))}
          </div>
          <div className={styles.chatTextField}>
            <form onSubmit={appendMessage}>
              <input
                type="text"
                placeholder="Write here...."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </form>
          </div>
        </div>
      </SwipeableViews>
    </div>
  );
}
