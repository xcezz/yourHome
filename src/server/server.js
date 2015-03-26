var express = require('express'),
    app = express();
    server = require('http').createServer(app).listen(3000),
    io = require('socket.io').listen(server),
    fs = require('fs'),
    homedata = {},
    usernames = {};

io.sockets.on('connection', function (socket) {
    
    console.log("connected");

    // NEW MESSAGE
    socket.on('newData', function (data) {
        homedata = data;
        io.sockets.emit('updateData', {
            homedata: homedata
        });
    });

    // USER CONNECTED
    socket.on('new user', function (data) {
        console.log(data);
        socket.username = data.username;
        usernames[socket.username] = data.username;
        socket.emit('login', {
            status: 'ok',
            users: usernames,
            messages: messages
        });
        socket.broadcast.emit('user joined', {
            newUser: socket.username,
            users: usernames
        });
    });
});