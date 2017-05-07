var five = require("johnny-five");
var express = require('express');
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var app = express();
app.use('/socket-io', express.static(__dirname + '/node_modules/socket.io-client/dist'));


five.Board().on("ready", function() {

    var isConnected = false;

    var button = new five.Button({
        pin: 2,
        isPullup: true
    });

    io.on('connection', function(){
        console.log('connected');
        isConnected = true;
    });



    button.on("up", function() {
        if (isConnected) {
            io.sockets.emit('take-picture', {'taking': true});
        }
    });


    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/index.html'));
    });


    app.listen(3000, function () {
        console.log('localhost:3000 is on');
    });

    server.listen(1800);
});