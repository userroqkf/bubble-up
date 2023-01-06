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

let queue = [];
let allUsers = []

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  // socket.emit("new_random_user");
  // Instead, you want to emit to all sockets
  // io.sockets.emit('users_count', clients);
  // to all sockets excpet you
  socket.broadcast.emit('new_random_user');
  // idea: get users socket info and put them in a queue and pop them each time they press the join room button
  // console.log("connection socket", socket.id);
  // socket.on("join_room", (data) => {
  //   const peer = socketQueue.pop();
  //   peer.join(data)
  //   socket.join(data)
  //   console.log(`User with ID: ${socket.id} joined room: ${data}`);

  queue.push(socket);
  allUsers.push(socket);
  console.log("check queue length connection",queue.length)
  console.log("connection queue map",queue.map((curr) => curr.id));
  console.log("connection allUsers map",allUsers.map((curr) => curr.id));
  socket.on("join_room", (data) => {
  //   if (queue.length > 0) {
  //     let peer = queue.pop();
  //     let room = socket.id + peer.id;
  //     peer.join(room);
  //     socket.join(room);
  //     socket.emit("room_id", room);
  //   } else {
  //     // disable button
  // }
    let room = socket.id + data;
    // console.log("join_room data", data)
    // console.log(socket.id)
    console.log("room from server",room)
    let peer = allUsers.find(user => user.id === data)
    // console.log("checkign peer",peer.id);
    if (peer) {
      peer.join(room);
      socket.join(room);
      socket.emit("room_id", {'name': socket.id, 'room':room});
      peer.emit("room_id", {'name': peer.id, 'room':room});
    } else {
      socket.emit("remove_new_chat_request")
    }
    // FIXME: getting socket connection but not rendering on client side


    // socket.emit("room_id", room);
    // peer.emit("room_id", room);
  });
  socket.on("find_random_user", () => {
    console.log("find random user", queue.length)
    console.log("queue map",queue.map((curr) => curr.id));
    // console.log("checking queue order", queue[0].id)
    if(queue.length > 0 && socket.id !== queue[0].id) {
      let peer = queue.shift();
      console.log('popped')
      console.log("server queue length find random user",queue.length)

      if(queue.length === 1) {
        socket.emit("no_new_user");
      }
      io.to(peer.id).emit("new_chat_request", socket.id);
    } else {
      socket.emit("no_new_user");
      console.log('not enough people')
    }
  })

  socket.on("send_message", (data) => {
    console.log("send message", data)
    socket.to(data.room).emit("receive_message", data);
  });


  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => {
      console.log("room info",room)
      socket.to(room).emit("remove_chat", room);
    })
    queue = queue.filter(user => user.id !== socket.id);
    allUsers = allUsers.filter(user => user.id !== socket.id);
    console.log("User Disconnected", socket.id);
    // TODO: remove rooms on disconnect;
    //io.of("/roomName").emit("eventName", "message");
  });
});

server.listen(3001, () => {
});