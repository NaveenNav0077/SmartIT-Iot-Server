// "start": "NODE_ENV=production nodemon index.js"
const express = require("express");
const app = express();
var http = require('http');
var port = 5001;

app.set('port', port);

app.get('/',(req,res)=>{
    res.send('SmartIT Web Server');
});


var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port,()=>{
    console.log('server lisining on port '+port)
});

//////////////////Web socket/////////////////////////

const io = require('socket.io')(server);

io.on("connect",(socket)=>{
    console.log('New user connected');

    socket.emit("auth","Is Device Is Online");

    socket.on("status", (data)=>{
      console.log(data);
    })

    socket.on("JoinRoom",(room)=>{
      console.log(room);
     /* socket.join(room);
      socket.to(room).emit("message",'Room name =  '+ room + ' user id = ' + socket.id);*/
    });

    socket.on("message",({ room, data })=>{
      console.log(data);
      socket.to(room).emit("message",data);
    });

});

//////////////////Web socket/////////////////////////