// ChatApp.js
import { height } from '@mui/system';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Thay đổi URL theo máy chủ của bạn

const ChatApp = () => {
const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const userMessage = {
        text: `Bạn: ${message}`,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      // Phản hồi từ "mobile" sau 1 giây
      setTimeout(() => {
        const mobileMessage = {
          text: 'This is a response from the mobile.',
          sender: 'mobile',
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prevMessages) => [...prevMessages, mobileMessage]);
      }, 1000);

      // Xóa tin nhắn sau khi gửi
      setMessage('');
    }
  };


  return (
    <div style={styles.container}>
      <div style={styles.chatContainer}>
      <div style={styles.messageContainer}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={
              msg.sender === 'user'
                ? styles.senderMessage
                : styles.receiverMessage
            }
          >
            <p>{msg.text}</p>
            <span style={styles.timestamp}>{msg.timestamp}</span>
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Nhập tin nhắn..."
        />
        <button onClick={handleSendMessage} style={styles.sendButton}>
          Gửi
        </button>
      </div>
      </div>
    </div>
  );
};

const styles = {
    chatContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '600px',
        margin: 'auto',
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '10px',
        height: "80vh",
      },
      messageContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '10px',
        maxHeight: '800px',
        overflowY: 'scroll',
      },
      senderMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6',
        padding: '10px',
        borderRadius: '10px',
        maxWidth: '60%',
        textAlign: 'right',
      },
      receiverMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#FFF',
        padding: '10px',
        borderRadius: '10px',
        maxWidth: '60%',
        textAlign: 'left',
        border: '1px solid #ddd',
      },
      timestamp: {
        fontSize: '0.75rem',
        color: '#888',
        marginTop: '5px',
      },
      inputContainer: {
        display: 'flex',
        padding: '10px',
        borderTop: '1px solid #ccc',
      },
      input: {
        flex: 1,
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
      },
      sendButton: {
        padding: '10px 20px',
        marginLeft: '10px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      },
};

export default ChatApp;
