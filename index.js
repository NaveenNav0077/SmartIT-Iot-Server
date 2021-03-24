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

    socket.emit("auth","Check Is Device Is Online");

    socket.on("status", (data)=>{
       socket.emit("DeviceStatus",data);
    })

    socket.on("JoinRoom",(room)=>{
      socket.join(room)
    });

    socket.on("message",({ roomName, deviceName, switchNo, switchStatus })=>{
      let data = 0;
      switch(switchNo){
        case 1:
          switchStatus === true ? data = 1 : data = 2;
          break;
        case 2:
          switchStatus === true ? data = 3 : data = 4;
          break;
        case 3:
          switchStatus === true ? data = 5 : data = 6;
          break;
        case 4:
          switchStatus === true ? data = 7 : data = 8;
          break;
        default: 
          data=0;
      }
      socket.to(roomName).emit( deviceName, data );
    });

});

//////////////////Web socket/////////////////////////