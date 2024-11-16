// ChatApp.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getToken } from '../../utils/auth';


const ChatApp = () => {

  const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const token = getToken();

   
    useEffect(() => {
      // Bind to the 'connected' event to retrieve the socket ID
      

      // Fetch existing messages on load
      const fetchMessages = async () => {
          try {
              const response = await axios.get('http://192.168.1.22:8000/api/v1/chat/messages', {
                  headers: {
                      Authorization: `Bearer ${token}`
                  }
              });
              setMessages(response.data.messages);
          } catch (error) {
              console.error('Error fetching messages:', error);
          }
      };

      fetchMessages();

      // Cleanup the channel on component unmount
      
  }, [token]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://192.168.1.22:8000/api/v1/chat/messages', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessages(response.data.messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        try {
            // Obtain the socket ID
            

            setMessage(''); // Clear input field
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
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
