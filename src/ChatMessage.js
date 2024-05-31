// ChatMessage.js
import React from 'react';

function ChatMessage({ message }) {
  const { user, text, timestamp } = message;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    return formattedTime;
  };

  return (
    <div className="chat-message">
      <p>
        <span className="message-user">{user}:</span>
        <span className="message-text">{text}</span>
        <span className="message-time">{formatDate(timestamp)}</span>
      </p>
    </div>
  );
}

export default ChatMessage;
