import React, { useState } from 'react';
import './stylesheets/inbox.css';
import Chat from './Chat';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  {
    id: 1,
    sender: 'Alice',
    subject: 'Meeting Reminder',
    timestamp: '2023-10-01 10:00 AM',
    status: 'online',
    avatar: 'https://via.placeholder.com/40',
    chatMessages: [
      { sender: 'Alice', text: "Don't forget our meeting tomorrow!", timestamp: '10:00 AM' },
      { sender: 'me', text: 'Thanks for the reminder!', timestamp: '10:01 AM' },
    ],
  },
  {
    id: 2,
    sender: 'Bob',
    subject: 'Project Update',
    timestamp: '2023-10-02 11:30 AM',
    status: 'offline',
    avatar: 'https://via.placeholder.com/40',
    chatMessages: [
      { sender: 'Bob', text: 'The project is on track.', timestamp: '11:30 AM' },
      { sender: 'me', text: 'Great to hear!', timestamp: '11:31 AM' },
    ],
  },
  {
    id: 3,
    sender: 'Charlie',
    subject: 'Lunch Plans',
    timestamp: '2023-10-03 12:15 PM',
    status: 'away',
    avatar: 'https://via.placeholder.com/40',
    chatMessages: [
      { sender: 'Charlie', text: 'Are we still on for lunch?', timestamp: '12:15 PM' },
      { sender: 'me', text: 'Yes, see you at noon!', timestamp: '12:16 PM' },
    ],
  },
  {
    id: 4,
    sender: 'Diana',
    subject: 'Happy Birthday!',
    timestamp: '2023-10-04 09:00 AM',
    status: 'online',
    avatar: 'https://via.placeholder.com/40',
    chatMessages: [
      { sender: 'Diana', text: 'Happy Birthday! 🎉', timestamp: '09:00 AM' },
      { sender: 'me', text: 'Thank you so much!', timestamp: '09:01 AM' },
    ],
  },
];

function MessageItem({ id, sender, subject, timestamp, avatar, status, onClick }) {
  return (
    <motion.div 
      className="message-item"
      whileHover={{ scale: 1.02, backgroundColor: '#f0f0f0' }}
      transition={{ type: 'spring', stiffness: 300 }}
      onClick={onClick}
    >
      <div className="message-avatar">
        <img src={avatar} alt={sender} />
        <div className={`status-dot ${status}`}></div>
      </div>
      <div className="message-content">
        <div className="message-sender">{sender}</div>
        <div className="message-subject">{subject}</div>
        <div className="message-timestamp">{timestamp}</div>
      </div>
    </motion.div>
  );
}

function Inbox() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleMessageClick = (message) => {
    setSelectedChat(message);
  };

  const handleBackToInbox = () => {
    setSelectedChat(null);
  };

  const filteredMessages = messages.filter(
    message => 
      message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="inbox-container">
      <AnimatePresence mode="wait">
        {selectedChat ? (
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Chat 
              messages={selectedChat.chatMessages} 
              user={{ name: selectedChat.sender }} 
              onBack={handleBackToInbox}
            />
          </motion.div>
        ) : (
          <motion.div
            key="inbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="inbox"
          >
            <div className="inbox-header">
              <h2>Messages</h2>
              <div className="search-container">
                <input 
                  type="text" 
                  placeholder="Search messages..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>
            <div className="messages-list">
              {filteredMessages.length === 0 ? (
                <div className="no-messages">No messages found</div>
              ) : (
                filteredMessages.map((message) => (
                  <MessageItem
                    key={message.id}
                    id={message.id}
                    sender={message.sender}
                    subject={message.subject}
                    timestamp={message.timestamp}
                    avatar={message.avatar}
                    status={message.status}
                    onClick={() => handleMessageClick(message)}
                  />
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Inbox;