import React from "react";
import { useState, useEffect } from "react";
import io from "socket.io-client";

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

function Chat() {
  //backend connection
  const socket = io.connect("http://localhost:4000");

  const [message, setMessage] = useState("");

  //rename later
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    //incoming messages listener
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]); // ? research this syntax
    });
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("send_message", {
        text: message,
        sender: "gyb",
      });
      // clear message state
      setMessage("");
      console.log(messages);
      
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        // height: "100vh",
        padding: 2,
        bgcolor: "#f5f5f5",
      }}
    >
      <Typography
        elevation={3}
        sx={{
          mb: 2,
          fontWeight: "bold",
        }}
      >
        Chat App
      </Typography>

      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 600,
          height: "60vh",
          overflowY: "scroll",
          padding: 2,
          mb: 2,
        }}
      >
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index} sx={{ mb: 1 }}>
              <Paper
                sx={{
                  padding: 1,
                  bgcolor: msg.sender === "User" ? "#e3f2fd" : "#f1f8e9",
                  width: "100%",
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="body1">{msg.sender}</Typography>
                  }
                  secondary={
                    <Typography variant="body2">{msg.text}</Typography>
                  }
                />
              </Paper>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          maxWidth: 600,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Send Message..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          sx={{ mr: 1 }}
        ></TextField>

        <Button
          variant="contained"
          color="primary"
          onClick={sendMessage}
          sx={{ width: "120px" }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}

export default Chat;
