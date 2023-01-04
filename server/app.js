const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const queue = [];

io.on("connection", (socket) => {
  // console.log(`User Connected: ${socket.id}`);
  // idea: get users socket info and put them in a queue and pop them each time they press the join room button
  // console.log("connection socket", socket.id);
  // socket.on("join_room", (data) => {
  //   const peer = socketQueue.pop();
  //   peer.join(data)
  //   socket.join(data)
  //   console.log(`User with ID: ${socket.id} joined room: ${data}`);
  socket.on("join_room", () => {
    if (queue.length > 0) {
      let peer = queue.pop();
      let room = socket.id + peer.id;
      peer.join(room);
      socket.join(room);
      socket.emit("room_id", room);
    } else {
      queue.push(socket);
  }
  });
  socket.on("send_message", (data) => {
    console.log("send message", data)
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
});