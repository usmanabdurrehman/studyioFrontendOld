import React, { useState, useEffect, useRef } from "react";
import styles from "./Chat.module.scss";

import SwipeableViews from "react-swipeable-views";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import { getProfileImageURL } from "utils";

import { service } from "services";

import { useSelector } from "react-redux";

import CircularProgress from "@material-ui/core/CircularProgress";

export default function Chat() {
  const socket = useSelector((state) => state.socket);
  const user = useSelector((state) => state.user);
  const { _id } = user;
  let [messages, setMessages] = useState([]);

  const [searchString, setSearchString] = useState("");

  const [searchNames, setSearchNames] = useState(null);
  const [conversations, setConversations] = useState(null);
  let fetchNamesHandler = async (name) => {
    service({
      method: "post",
      url: "/user/conversations/more",
      body: { name },
    }).then((res) => {
      const { data } = res;
      data && setSearchNames(data);
    });
  };

  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearchString(value);
    value ? fetchNamesHandler(e.target.value) : setSearchNames(null);
  };

  const [index, setIndex] = useState(0);

  const messagesContainer = useRef(null);

  let [message, setMessage] = useState("");
  const [openedChat, setOpenedChat] = useState(null);
  const lastOpenedChat = useRef();

  const openedChatMember = openedChat?.participants?.find(
    (participant) => participant._id != _id
  );

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
        setMessages(conversation.messages);
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
    if (index) {
      setSearchString("");
      setSearchNames(null);
    }
  }, [index]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("message", { message, conversationId: openedChat._id });
  };

  useEffect(() => {
    socket.on("message_change", (message) => {
      setMessage("");
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  useEffect(() => {
    if (openedChat) {
      lastOpenedChat.current &&
        socket.emit("leaveRoom", { id: lastOpenedChat.current._id });
      socket.emit("joinRoom", { id: openedChat._id });
      lastOpenedChat.current = openedChat;
    }
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
        {index ? openedChatMember.name : "Inbox"}
        {index == 1 && (
          <ArrowBackIosIcon
            className={styles.arrowBackward}
            onClick={(e) => setIndex(0)}
          />
        )}
      </div>
      <SwipeableViews
        index={index}
        style={{ height: "100%" }}
        containerStyle={{ height: "100%" }}
      >
        <div className={styles.searchWrapper}>
          <input
            placeholder="Search..."
            value={searchString}
            className={styles.search}
            onChange={onSearchChange}
          />
          {conversations && conversations?.length ? (
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
                  <div onClick={() => openConversation(conversation._id)}>
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
          ) : (
            !searchNames?.length && (
              <div className={styles.noConversationWrapper}>
                Sorry, you have not got any conversation yet.
              </div>
            )
          )}
          {searchNames && (
            <div className={styles.nameList}>
              {conversations && conversations.length > 0 && (
                <h5 className={styles.searchNamesHeader}>More People</h5>
              )}
              {searchNames.map(({ name, _id, profileImage }) => (
                <div
                  onClick={() => startConversation({ _id, name, profileImage })}
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
        <div className={styles.chatWrapper}>
          <div className={styles.chatMessages} ref={messagesContainer}>
            {openedChat &&
              messages.map(({ text, sentBy }) => (
                <div
                  className={`${styles.chatMessage} ${
                    sentBy == _id ? styles.ownMessage : styles.notOwnMessage
                  }`}
                >
                  {text}
                </div>
              ))}
          </div>
          <div className={styles.chatTextField}>
            <form onSubmit={sendMessage}>
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
