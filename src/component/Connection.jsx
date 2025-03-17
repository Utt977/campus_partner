import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { addConnection } from '../utils/connectionSlice';
import { createSocketConnection } from '../utils/socket';

const Connection = () => {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const fetchChats = async () => {
        try {
            const [chatRes, connRes] = await Promise.all([
                axios.get(`${BASE_URL}/chats`, { withCredentials: true }),
                axios.get(`${BASE_URL}/user/connections`, { withCredentials: true })
            ]);
            
            setChats(chatRes.data);
            dispatch(addConnection(connRes.data?.data || []));
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load chats');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChats();

        const socket = createSocketConnection();
        socket.on('unreadCountUpdate', ({ chatId, unreadCount }) => {
            setChats(prev => prev.map(chat => 
                chat._id === chatId ? { ...chat, unreadCount } : chat
            ));
        });

        socket.on('messageReceived', () => {
            fetchChats(); // Refresh chats for real-time unread count
        });

        socket.on('messageSeen', () => {
            fetchChats(); // Update when messages are seen
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    // Function to format last active time or last message time
    const formatTime = (timestamp) => {
        if (!timestamp) return 'recently';
        const now = new Date();
        const diff = now - new Date(timestamp);
        const minutes = Math.floor(diff / 60000); // Convert to minutes

        if (minutes < 1) return 'just now';
        if (minutes < 60) return `${minutes}m`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h`;
        const days = Math.floor(hours / 24);
        return `${days}d`;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 max-w-md mx-auto bg-gray-900 min-h-screen">
                <div className="text-red-400 bg-red-900/20 p-4 rounded-xl flex items-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {error}
                </div>
            </div>
        );
    }

    if (!chats.length) {
        return (
            <div className="text-center py-20 px-4 bg-gray-900 min-h-screen">
                <div className="max-w-md mx-auto">
                    <svg className="w-16 h-16 text-gray-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m-7 4h8a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h2 className="text-2xl font-bold text-white mb-2">No Chats Yet</h2>
                    <p className="text-gray-400">Start chatting with your connections!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto bg-gray-900 min-h-screen px-4 py-6">
            <h1 className="text-2xl font-semibold text-white mb-6">Chats</h1>
            <div className="space-y-2">
                {chats.map((chat) => {
                    const otherUser = chat.participants.find(p => p._id !== user._id);
                    const unreadCount = chat.unreadCount[user._id] || 0;
                    const lastMessage = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;

                    return (
                        <Link 
                            key={chat._id}
                            to={`/chat/${otherUser._id}`}
                            className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all border-b border-gray-700/50"
                        >
                            <div className="flex items-center gap-3 w-full">
                                {/* Profile Picture */}
                                <div className="relative flex-shrink-0">
                                    <img 
                                        src={otherUser.photoUrl || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} 
                                        alt="Profile" 
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <span 
                                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${otherUser.isOnline ? 'bg-green-500' : 'bg-gray-500'}`}
                                    />
                                </div>

                                {/* Name and Last Message */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-white font-semibold truncate">
                                            {otherUser.firstName} {otherUser.lastName}
                                        </h3>
                                        <span className="text-xs text-gray-400 flex-shrink-0">
                                            {lastMessage ? formatTime(lastMessage.createdAt) : formatTime(otherUser.lastActive)}
                                        </span>
                                    </div>
                                    <p className={`text-sm truncate ${unreadCount > 0 ? 'text-purple-400 font-medium' : 'text-gray-400'}`}>
                                        {lastMessage ? lastMessage.text : 'No messages yet'}
                                    </p>
                                </div>

                                {/* Unread Count Badge */}
                                {unreadCount > 0 && (
                                    <div className="flex-shrink-0">
                                        <span className="bg-green-500 text-white text-xs font-semibold rounded-full px-2 py-1">
                                            {unreadCount}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Connection;