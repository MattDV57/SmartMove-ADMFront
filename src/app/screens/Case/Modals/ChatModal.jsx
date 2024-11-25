import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Paper,
  List,
  ListItem,
  Dialog,
  TextField,
  Button,
  Typography,
  Avatar,
} from "@mui/material";
import { useAuth } from "../../../../context/AuthProvider";
import SendIcon from "@mui/icons-material/Send";

import io from "socket.io-client";

const assignColorToUser = (() => {
  const userColorMap = new Map();
  const availableColors = [
    "primary",
    "info",
    "warning",
    "error",
  ];

  return (username) => {
    if (!userColorMap.has(username)) {
      const nextColor = availableColors[userColorMap.size % availableColors.length];
      userColorMap.set(username, nextColor);
    }
    return userColorMap.get(username);
  };
})();

export const ChatModal = ({ open, onClose, claim, USER_PERMISSIONS }) => {
  const { auth } = useAuth();
  const isAllowedToChat = USER_PERMISSIONS?.PUT_IN_CHAT;

  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      text: "Chat initialized at: " + claim.timestamp,
      sender: "other",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [useInterval, setUseInterval] = useState(null);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const message = {
        body: newMessage,
        from: auth.username,
        chatId: claim.relatedChat,
        sender: auth.username,
      };
      socket.emit("chatMessage", message);
      setNewMessage("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const socketResponse = io.connect(import.meta.env.VITE_API_URL_BACKEND);
    setSocket(socketResponse);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("message", (data) => {
        receiveMessage(data);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket && claim) {
      socket.emit("joinChat", claim.relatedChat);
    }
  }, [socket, claim]);

  useEffect(() => {
    if (socket && claim && claim.category == "WhatsApp") {
      const getObject = {
        chatId: claim.relatedChat,
        message: messages.at(-1),
      };
      socket.emit("getLastMessage", getObject);
    }
  }, [useInterval]);

  useEffect(() => {
    const interval = setInterval(() => {
      setUseInterval(Date.now());
    }, 5000);

    // Cleanup the interval on unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  // useEffect(() => {
  //   const socketResponse = io.connect(import.meta.env.VITE_API_URL_BACKEND);
  //   setSocket(socketResponse);

  //   return () => {
  //     socketResponse.disconnect();
  //   };
  // }, []);

  const receiveMessage = (data) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Date.now(),
        text: data.body,
        sender: data.sender != null ? data.sender : "other",
        timestamp:
          data.timestamp != null ? new Date(data.timestamp) : new Date(),
      },
    ]);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl">
      {/* <Dialog open={open} onClose={!isLoading ? onClose : null} maxWidth="sm"> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100%",
          margin: "auto",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ p: 2 }}>
          Chat
        </Typography>

        <Paper elevation={3} sx={{ flex: 1, overflow: "auto", mb: 2, p: 2 }}>
          <List>
            {messages.map((message) => {
              // Determinar el color según el remitente
              const senderColor =
                message.sender === auth.username
                  ? "primary.light"
                  : assignColorToUser(message.sender);

              const textColor =
                message.sender === auth.username ? "white" : "black";

              return (
                <ListItem
                  key={message.id}
                  sx={{
                    justifyContent:
                      message.sender === auth.username
                        ? "flex-end"
                        : "flex-start",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems:
                        message.sender === auth.username
                          ? "flex-end"
                          : "flex-start",
                      maxWidth: "70%",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Typography variant="body2" color={senderColor}>
                        {message.sender}
                      </Typography>
                    </Box>
                    <Paper
                      elevation={1}
                      sx={{
                        p: 1,
                        bgcolor:
                          message.sender === auth.username
                            ? "primary.light"
                            : "grey.100",
                      }}
                    >
                      <Typography variant="body1" color={textColor}>
                        {message.text}
                      </Typography>
                    </Paper>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        {message.timestamp.toLocaleTimeString()}
                      </Typography>
                    </Box>
                  </Box>
                </ListItem>
              );
            })}
            <div ref={messagesEndRef} />
          </List>
        </Paper>

        {/* Área de entrada de mensajes */}
        <Paper elevation={3} sx={{ p: 2 }}>
          <Box sx={{ display: "flex" }}>
            <TextField
              fullWidth
              disabled={!isAllowedToChat}
              variant="outlined"
              placeholder="Escribe un mensaje..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button
              variant="contained"
              disabled={!isAllowedToChat}
              color="primary"
              endIcon={<SendIcon />}
              onClick={handleSendMessage}
              sx={{ ml: 1 }}
            >
              Enviar
            </Button>
          </Box>
        </Paper>
      </Box>
    </Dialog>
  );
};
