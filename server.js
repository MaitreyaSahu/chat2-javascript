const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const { Socket } = require('dgram');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    console.log('new websocket connection..');
    //Socket.emit('message', 'welcome to the app');
    socket.emit('message', 'hiiiiii');
    
    socket.broadcast.emit('message', 'An user has joined');

    socket.on('chatMessage', msg => {
        io.emit('message', msg)
    })

    socket.on('disconnect', () => {
        io.emit('message', 'An user left')
    })
})

const PORT = 3000 ||  process.env.PORT;

server.listen(PORT, () => console.log('server is running on port', PORT));