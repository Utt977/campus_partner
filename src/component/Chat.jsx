import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { createSocketConnection } from "../utils/socket";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector(store => store.user);
  const userId = user?._id;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  
  const messagesEndRef = useRef(null);  // Reference for the end of the messages container

  // Fetch chat messages
  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, { withCredentials: true });
      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text
        }
      })
      setMessages(chatMessages);
    } catch (err) {
      console.log(err);
    }
  };

  // Scroll to the bottom of the messages container when messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // UseEffect to fetch initial data
  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    socket.emit("joinChat", { firstName: user.firstName, userId, targetUserId });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    })

    return () => {
      socket.disconnect();
    }
  }, [userId, targetUserId]);

  // Send message function
  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage
    });
    setNewMessage("");
  }

  // Scroll to the most recent message after messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="w-full mx-auto max-w-xl h-[80vh] flex flex-col bg-gray-800 text-white">
      {/* Header Section with Chat Title */}
      <div className="flex items-center justify-center p-4 bg-gray-900 border-b border-gray-700">
        <h2 className="text-2xl font-semibold">Chat</h2>
      </div>

      {/* Messages Section */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`chat ${user.firstName === msg.firstName ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-header">
              {`${msg.firstName} ${msg.lastName}`}
              {/* <time className="text-xs opacity-50"> 2 hours ago</time> */}
            </div>
            <div className="chat-bubble">{msg.text}</div>
            {/* <div className="chat-footer opacity-50">Seen</div> */}
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* This div will be used to scroll to the bottom */}
      </div>

      {/* Message Input Section */}
      <div className="p-4 border-t border-gray-700 flex items-center gap-2 bg-gray-900">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 rounded-full p-3 bg-gray-800 text-white"
          placeholder="Type a message"
        />
        <button onClick={sendMessage} className="btn bg-green-500 text-white p-3 rounded-full hover:bg-green-600">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
