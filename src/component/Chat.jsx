import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { format } from 'date-fns';
import { BASE_URL } from '../utils/constant';
import { createSocketConnection } from "../utils/socket";
import { FaPaperPlane } from 'react-icons/fa';

const Chat = () => {
    const { targetUserId } = useParams();
    const user = useSelector(store => store.user);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [typingUser, setTypingUser] = useState(null);
    const [targetUser, setTargetUser] = useState(null);
    const messagesEndRef = useRef(null);
    const socketRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    const fetchChatData = useCallback(async () => {
        if (!user?._id || !targetUserId) return;

        try {
            const [userRes, chatRes] = await Promise.all([
                axios.get(`${BASE_URL}/profile/${targetUserId}`, { withCredentials: true }),
                axios.get(`${BASE_URL}/chat/${targetUserId}`, { withCredentials: true })
            ]);

            setTargetUser(userRes.data);
            const fetchedMessages = chatRes.data.messages.map(msg => ({
                ...msg,
                senderId: msg.senderId._id || msg.senderId,
                status: msg.seen ? 'read' : 'delivered',
                createdAt: msg.createdAt || msg.timestamp || new Date().toISOString()
            }));
            setMessages(fetchedMessages);
        } catch (err) {
            console.error('Error fetching chat data:', err);
        }
    }, [targetUserId, user]);

    useEffect(() => {
        fetchChatData();
    }, [fetchChatData]);

    useEffect(() => {
        if (!user?._id || !targetUserId) return;

        socketRef.current = createSocketConnection();

        socketRef.current.emit('userOnline', user._id);

        const roomId = [user._id, targetUserId].sort().join('_');
        socketRef.current.emit('joinChat', { userId: user._id, targetUserId });

        const handleMessageReceived = (message) => {
            setMessages(prev => {
                const filtered = prev.filter(msg => msg.tempId !== message.tempId);
                return [...filtered, { 
                    ...message, 
                    senderId: message.senderId,
                    status: 'delivered',
                    createdAt: message.timestamp || new Date().toISOString()
                }];
            });
        };

        const handleTypingStatus = ({ userId, firstName, isTyping }) => {
            console.log('Typing event received:', { userId, firstName, isTyping, targetUserId });
            if (userId === targetUserId) {
                setIsTyping(isTyping);
                setTypingUser(isTyping ? { firstName } : null);
            }
        };

        const handleUserStatusChanged = ({ userId, isOnline }) => {
            if (userId === targetUserId) {
                setTargetUser(prev => prev ? { ...prev, isOnline } : null);
            }
        };

        const handleMessageSeen = ({ chatId }) => {
            console.log('Message seen event received:', { chatId });
            setMessages(prev => prev.map(msg => 
                msg.senderId === user._id && !msg.seen 
                    ? { ...msg, status: 'read', seen: true } 
                    : msg
            ));
        };

        socketRef.current.on('messageReceived', handleMessageReceived);
        socketRef.current.on('typingStatus', handleTypingStatus);
        socketRef.current.on('userStatusChanged', handleUserStatusChanged);
        socketRef.current.on('messageSeen', handleMessageSeen);

        return () => {
            socketRef.current.emit('userOffline', user._id);
            socketRef.current.off('messageReceived', handleMessageReceived);
            socketRef.current.off('typingStatus', handleTypingStatus);
            socketRef.current.off('userStatusChanged', handleUserStatusChanged);
            socketRef.current.off('messageSeen', handleMessageSeen);
            socketRef.current.disconnect();
        };
    }, [user, targetUserId]);

    useEffect(() => {
        if (!socketRef.current) return;

        const handleTyping = () => {
            socketRef.current.emit('typing', { 
                userId: user._id,
                firstName: user.firstName,
                targetUserId,
                isTyping: !!newMessage 
            });
            clearTimeout(typingTimeoutRef.current);
            if (newMessage) {
                typingTimeoutRef.current = setTimeout(() => {
                    socketRef.current.emit('typing', { 
                        userId: user._id,
                        firstName: user.firstName,
                        targetUserId,
                        isTyping: false 
                    });
                }, 1000);
            }
        };

        handleTyping();
    }, [newMessage, targetUserId, user]);

    const sendMessage = () => {
        if (!newMessage.trim() || !user?._id) return;

        const tempId = Date.now().toString();
        const tempMessage = {
            _id: tempId,
            text: newMessage,
            senderId: user._id,
            createdAt: new Date().toISOString(),
            status: 'sent',
            tempId
        };

        setMessages(prev => [...prev, tempMessage]);
        setNewMessage('');

        socketRef.current.emit('sendMessage', {
            userId: user._id,
            targetUserId,
            text: newMessage,
            tempId
        });
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Function to format date for display
    const formatMessageDate = (date) => {
        const today = new Date();
        const messageDate = new Date(date);
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        if (format(today, 'yyyy-MM-dd') === format(messageDate, 'yyyy-MM-dd')) {
            return 'Today';
        } else if (format(yesterday, 'yyyy-MM-dd') === format(messageDate, 'yyyy-MM-dd')) {
            return 'Yesterday';
        } else {
            return format(messageDate, 'dd MMMM yyyy'); // e.g., "16 March 2025"
        }
    };

    if (!user) {
        return <div className="text-center p-4 text-white">Please log in to view the chat.</div>;
    }

    return (
        <div className="w-full max-w-2xl mx-auto h-[80vh] flex flex-col bg-base-300 shadow-lg">
            {/* Chat Header */}
            <div className="p-4 bg-base-200 flex items-center shadow-md">
                {targetUser ? (
                    <div className="flex items-center w-full">
                        <div className={`avatar ${targetUser.isOnline ? 'online' : 'offline'}`}>
                            <div className="w-10 rounded-full ring-2 ring-primary">
                                <img 
                                    src={targetUser.photoUrl || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} 
                                    alt="Profile" 
                                />
                            </div>
                        </div>
                        <div className="ml-4">
                            <h2 className="font-semibold text-white text-lg">
                                {targetUser.firstName} {targetUser.lastName}
                            </h2>
                            <p className="text-sm text-gray-400">
                                {targetUser.isOnline ? 'Online' : `Last seen ${formatLastActive(targetUser.lastActive)}`}
                            </p>
                        </div>
                        {isTyping && typingUser && (
                            <div className="ml-auto text-sm text-gray-400 animate-pulse">
                                {typingUser.firstName} is typing...
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-white">Loading target user...</div>
                )}
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-base-300">
                {messages.length > 0 ? (
                    messages.map((msg, index) => {
                        const currentDate = new Date(msg.createdAt);
                        const prevMsg = index > 0 ? messages[index - 1] : null;
                        const prevDate = prevMsg ? new Date(prevMsg.createdAt) : null;
                        const showDateDivider = !prevDate || format(currentDate, 'yyyy-MM-dd') !== format(prevDate, 'yyyy-MM-dd');

                        return (
                            <React.Fragment key={msg._id || msg.tempId}>
                                {showDateDivider && (
                                    <div className="text-center my-4">
                                        <span className="bg-base-100 text-gray-400 text-xs px-3 py-1 rounded-full shadow-sm">
                                            {formatMessageDate(msg.createdAt)}
                                        </span>
                                    </div>
                                )}
                                <div 
                                    className={`flex ${msg.senderId === user._id ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div 
                                        className={`max-w-[70%] p-3 rounded-lg shadow-md ${
                                            msg.senderId === user._id 
                                                ? 'bg-primary text-white' 
                                                : 'bg-base-100 text-white'
                                        }`}
                                    >
                                        <p className="font-sans text-sm font-medium">{msg.text}</p>
                                        <div className="text-xs text-gray-300 mt-1 flex justify-end">
                                            {format(new Date(msg.createdAt), 'hh:mm a')}
                                            {msg.senderId === user._id && msg.status === 'read' && (
                                                <span className="ml-2 text-blue-800">✓✓</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    })
                ) : (
                    <div className="text-center text-gray-400">No messages yet.</div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="sticky bottom-0 p-4 bg-base-200 flex items-center gap-3 shadow-inner">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1 p-3 rounded-full bg-base-100 text-white border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                    placeholder="Type a message..."
                />
                <button 
                    onClick={sendMessage}
                    className="bg-primary text-white rounded-full p-3 hover:scale-105 active:scale-95 transition-transform duration-150 flex items-center justify-center shadow-md"
                    disabled={!newMessage.trim()}
                >
                    <FaPaperPlane className="text-lg" />
                </button>
            </div>
        </div>
    );
};

const formatLastActive = (lastActive) => {
    if (!lastActive) return 'recently';
    const now = new Date();
    const diff = now - new Date(lastActive);
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes/60)}h ago`;
    return `${Math.floor(minutes/1440)}d ago`;
};

export default Chat;