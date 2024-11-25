import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { getToken } from "../../utils/auth";
import { useParams } from "react-router-dom";
import { database } from "../chat/firebase";
import { ref, push,set, onValue } from "firebase/database";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const token = getToken();
  const { id } = useParams();
  const [username, setUsername] = useState(null);
 
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(`https://backendgrocery-production.up.railway.app/api/v1/user/edit/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsername(response.data.data.user_name);
        console.log("username", username);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`https://backendgrocery-production.up.railway.app/api/v1/chat/message/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMessages(response.data.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    // Get messages from Firebase
    const messagesRef = ref(database, `${id}/chatId/messages`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const firebaseMessages = Object.values(data);
        setMessages(firebaseMessages);
      }
    });

    console.log("messages", messages);

    return () => {
    };
  }, [id, token]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      // Send message to Firebase
      const messagesRef = ref(database, `${id}/chatId/messages`);
      const newMessageRef = push(messagesRef);
      await set(newMessageRef, {
        text: message,
        created_at: new Date().toUTCString(),
        user_send: "Admin"
      });

      // Send message to backend
      await axios.post(
        `https://backendgrocery-production.up.railway.app/api/v1/chat/message`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            chat_with: id,
            message: message
          }
        }
      );

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
    <Box m={2}>
      <Typography variant="h4" gutterBottom>
        Chat
      </Typography>
      <Paper elevation={3} style={{ padding: "16px", maxHeight: "400px", overflowY: "auto" }}>
        <List>
          {messages.map((msg, index) => (
            msg.user_send === "Admin"  ||  msg.chat_with == id ? (<ListItem key={index} style = {{textAlign: "right"}}>
              <ListItemText
                primary={`${msg.user?.user_name || 'Admin'} (${new Date(msg.created_at).toLocaleTimeString()})` }
                secondary={msg.text}
              />
            </ListItem>) :(<>
              <ListItem key={index} alignItems="flex-start" >
              <ListItemText
                primary={`${username || 'User'} (${new Date(msg.created_at).toLocaleTimeString()})`}
                secondary={msg.text}
              />
            </ListItem></>)
            
          ))}
        </List>
      </Paper>
      <Box mt={2} display="flex">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;