import React, { useState } from 'react';
import './Chatbot.css';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // This is just a placeholder for now, as the user mentioned they'll add functionality later
    console.log('Message sent:', inputValue);
    
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="header-left">
          <div className="green-circle"></div>
        </div>
        <div className="header-title">Chatbot</div>
        <div className="header-right">
          <div className="profile-icon"></div>
        </div>
      </div>
      
      <div className="chatbot-messages">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      
      <div className="chatbot-input-container">
        <input
          type="text"
          className="chatbot-input"
          placeholder="Type your question here..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button 
          className="send-button"
          onClick={handleSendMessage}
          disabled={inputValue.trim() === ''}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="white"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
