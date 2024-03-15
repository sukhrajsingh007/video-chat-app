// index.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle signaling
    socket.on('offer', (data) => {
        console.log('Offer received:', data);
        socket.broadcast.emit('offer', data);
    });

    socket.on('answer', (data) => {
        console.log('Answer received:', data);
        socket.broadcast.emit('answer', data);
    });

    socket.on('ice-candidate', (data) => {
        console.log('ICE candidate received:', data);
        socket.broadcast.emit('ice-candidate', data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start server
// const IP_ADDRESS = '192.168.11.14';
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    // console.log(`Server running at http://${IP_ADDRESS}:${PORT}/`);
    console.log(`Server running at ${PORT}/`);
});