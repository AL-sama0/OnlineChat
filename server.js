const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


let userList = [];
io.on('connection', (socket) => {
    socket.on('login', (userInfo) => {
        userList.push(userInfo);
        io.emit('userList', userList);
    })

    socket.on('disconnect', () => {
        userList = userList.filter(item => item.id != socket.id)
        io.emit('quit', socket.id)
    })

    socket.on('sendMsg', (data) => {
        socket.to(data.id).emit('receiveMsg', data)
    })
})

server.listen(8888, () => {
	console.log('http://localhost:8888/index.html')
});