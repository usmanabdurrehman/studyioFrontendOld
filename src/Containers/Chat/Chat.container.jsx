import React, { useState, useEffect, useRef } from 'react';
import service from 'services';

import { useSelector } from 'react-redux';

import { Chat } from 'Components';

export default function ChatContainer() {
  const socket = useSelector((state) => state.socket);
  const user = useSelector((state) => state.user);
  const { _id: userId } = user;
  const [messages, setMessages] = useState([]);

  const [searchString, setSearchString] = useState('');

  const [searchNames, setSearchNames] = useState(null);
  const [conversations, setConversations] = useState(null);
  const fetchNamesHandler = async (name) => {
    service({
      method: 'post',
      url: '/user/conversations/more',
      body: { name },
    }).then((res) => {
      const { data } = res;
      data && setSearchNames(data);
    });
  };

  const onSearchChange = (e) => {
    const { value } = e.target;
    setSearchString(value);
    value ? fetchNamesHandler(e.target.value) : setSearchNames(null);
  };

  const [index, setIndex] = useState(0);

  const [message, setMessage] = useState('');
  const [openedChat, setOpenedChat] = useState(null);
  const lastOpenedChat = useRef();

  const openedChatMember = openedChat?.participants?.find(
    (participant) => participant._id !== userId,
  );

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

  const startConversation = async (profile) => {
    service({
      url: '/user/conversations',
      method: 'post',
      data: { id: profile._id },
    }).then((res) => {
      const { status, conversation } = res.data;
      status && openConversation(conversation._id);
    });
  };

  const getAllConversations = () => {
    service({
      url: '/user/conversations',
    }).then((res) => {
      const { status, conversations: userConversations } = res.data;
      status && setConversations(userConversations);
    });
  };

  useEffect(() => {
    !index && getAllConversations();
    if (index) {
      setSearchString('');
      setSearchNames(null);
    }
  }, [index]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('message', { message, conversationId: openedChat._id });
  };

  const goBackToChatList = () => {
    setIndex(0);
  };

  const onMessageChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    socket.on('message_change', (newMessage) => {
      setMessage('');
      setMessages((allMessages) => [...allMessages, newMessage]);
    });
  }, [socket]);

  useEffect(() => {
    if (openedChat) {
      lastOpenedChat.current
        && socket.emit('leaveRoom', { id: lastOpenedChat.current._id });
      socket.emit('joinRoom', { id: openedChat._id });
      lastOpenedChat.current = openedChat;
    }
  }, [socket, openedChat]);

  return (
    <Chat
      index={index}
      messages={messages}
      message={message}
      openConversation={openConversation}
      startConversation={startConversation}
      onSearchChange={onSearchChange}
      conversations={conversations}
      openedChat={openedChat}
      openedChatMember={openedChatMember}
      searchString={searchString}
      searchNames={searchNames}
      sendMessage={sendMessage}
      userId={userId}
      goBackToChatList={goBackToChatList}
      onMessageChange={onMessageChange}
    />
  );
}
