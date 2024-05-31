// ChatRoom.js
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import ChatMessage from './ChatMessage';

const socket = io('http://localhost:3000'); // Update the URL to your server

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  // Send a message
  const sendMessage = () => {
    if (messageText.trim() !== '') {
      socket.emit('message', { user: 'YourUserName', text: messageText, timestamp: Date.now() });
      setMessageText('');
    }
  };

  // Receive messages
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message'); // Remove the event listener on component unmount
    };
  }, []);

  return (
    <div className="chat-room">
      <div className="messages">
        <h2>Messages:</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              <ChatMessage message={msg} />
            </li>
          ))}
        </ul>
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatRoom;
