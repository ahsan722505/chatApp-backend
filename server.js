const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }});
  const users={};

io.on("connection", (socket) => {
  
  socket.on("new-user",name=>{
    users[socket.id]=name;
    socket.broadcast.emit("new-user-joined",name);
  })
  socket.on("disconnect",name=>{
      
      socket.broadcast.emit("left",users[socket.id])
      delete users[socket.id];
    
  })
  socket.on("send-message",data=>{
      socket.broadcast.emit("receive-message",data)
  })
});

httpServer.listen(3000);