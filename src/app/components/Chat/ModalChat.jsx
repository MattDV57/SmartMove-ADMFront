import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  List,
  ListItem,
  Dialog,
  TextField,
  Button,
  Typography,
  Avatar
} from '@mui/material';

import SendIcon from '@mui/icons-material/Send';

import io from "socket.io-client";
import { ACCESS_CONTROL, ACTIONS } from '../../../common/rolesPermissions';

export const ModalChat = ({ open, onClose, claim, userId }) => {

  const accessRole = localStorage.getItem('userRole')

  const isAllowedToChat = ACCESS_CONTROL.roles[accessRole].actions.has(ACTIONS.CHAT);


  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      text: 'Hola',
      sender: 'other',
      timestamp: new Date()
    },
    {
      id: Date.now() + 1,
      text: 'Hola',
      sender: 'user',
      timestamp: new Date()
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [socket, setSocket] = useState(null)

  const roomId = '1234'

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const message = {
        id: Date.now(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const socketResponse = io.connect(import.meta.env.VITE_API_URL_BACKEND);
    setSocket(socketResponse)
    console.log({ claim })
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on("receive_message", (data) => {
        reciveMessage(data)
      });
    }
    // eslint-disable-next-line
  }, [socket]);

  useEffect(() => {
    if (socket && roomId) {
      socket.emit("join_room", roomId);
    }
    // eslint-disable-next-line
  }, [socket, roomId]);

  const reciveMessage = (data) => {
    console.log({ data })
    // const { message, value, count, name, lastname, jwt } = data
    // if (message === 'CANJEADO') {
    // 	setNotMsg(`QR Escaneado (${count} ${value}) por ${name} ${lastname}`)
    // 	setScanned(jwt === jwtLocal)
    // }
  }


  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl">
      {/* <Dialog open={open} onClose={!isLoading ? onClose : null} maxWidth="sm"> */}
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%', margin: 'auto' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ p: 2 }}>
          Chat
        </Typography>

        <Paper elevation={3} sx={{ flex: 1, overflow: 'auto', mb: 2, p: 2 }}>
          <List>
            {messages.map((message) => (
              <ListItem key={message.id} sx={{ justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {message.timestamp.toLocaleTimeString()}
                    </Typography>
                  </Box>
                  <Paper elevation={1} sx={{ p: 1, bgcolor: message.sender === 'user' ? 'primary.light' : 'grey.100' }}>
                    <Typography variant="body1" color={message.sender === 'user' ? 'white' : 'black'}>{message.text}</Typography>
                  </Paper>
                </Box>
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>
        </Paper>

        {/* Área de entrada de mensajes */}
        <Paper elevation={3} sx={{ p: 2 }}>

          <Box sx={{ display: 'flex' }}>
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
}