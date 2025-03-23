import React, { useState, useRef, useEffect } from 'react';
import './stylesheets/chat.css';
import { motion } from 'framer-motion';

const Chat = ({ messages, user, onBack }) => {
  const [newMessage, setNewMessage] = useState('');
  const [chatMessages, setChatMessages] = useState(messages || []);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setChatMessages([...chatMessages, { sender: 'me', text: newMessage, timestamp }]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <motion.div 
      className="chat-container fullscreen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="chat-header">
        <button className="back-button" onClick={onBack}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
        <h2>{user.name}</h2>
        <div className="status-indicator online"></div>
      </div>
      <div className="chat-messages">
        {chatMessages.map((message, index) => (
          <motion.div 
            key={index} 
            className={`message ${message.sender === 'me' ? 'my-message' : 'their-message'}`}
            initial={{ opacity: 0, x: message.sender === 'me' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>{message.text}</p>
            <span className="timestamp">{message.timestamp}</span>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input 
          type="text" 
          placeholder="Type a message..." 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSend} className="send-button">
          Send
        </button>
      </div>
    </motion.div>
  );
};

export default Chat;