import React, {
  useState, useEffect, useRef, useMemo, memo,
} from 'react';

import { useSelector } from 'react-redux';

import { Chat } from 'Components';

import {
  getConversationById, getConversationsByUser, createConversation, fetchConversationNames,
} from 'queries';

const ChatContainer = memo(() => {
  const socket = useSelector((state) => state.socket);
  const user = useSelector((state) => state.user);
  const { _id: userId } = user;
  const [messages, setMessages] = useState([]);

  const [searchString, setSearchString] = useState('');

  const [searchNames, setSearchNames] = useState(null);
  const [conversations, setConversations] = useState(null);

  const [index, setIndex] = useState(0);

  const [message, setMessage] = useState('');
  const [openedChat, setOpenedChat] = useState(null);
  const lastOpenedChat = useRef();

  const openedChatMember = useMemo(
    () => openedChat?.participants?.find(
      (participant) => participant._id !== userId,
    ),
    [openedChat, userId],
  );

  const fetchNamesHandler = async (name) => {
    const data = await fetchConversationNames(name);
    data && setSearchNames(data);
  };

  const onSearchChange = (e) => {
    const { value } = e.target;
    setSearchString(value);
    value ? fetchNamesHandler(e.target.value) : setSearchNames(null);
  };

  const openConversation = async (id) => {
    const { status, conversation } = await getConversationById(id);
    if (status) {
      setOpenedChat(conversation);
      setMessages(conversation.messages);
      setIndex(1);
    }
  };

  const startConversation = async (profile) => {
    const { status, conversation } = await createConversation(profile._id);
    status && openConversation(conversation._id);
  };

  const getAllConversations = async () => {
    const { status, conversations: userConversations } = await getConversationsByUser();
    status && setConversations(userConversations);
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
      setMessages((prevMessages) => [...prevMessages, newMessage]);
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
});

export default ChatContainer;
