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

const usersQueue = {};
let allUsers = []

io.on("connection", (socket) => {
  socket.broadcast.emit('new_random_user');
    
  for (const user in usersQueue) {
    usersQueue[user].push(socket);
  }
  allUsers.push(socket);
  if (!(socket.id in usersQueue)) {
    usersQueue[socket.id] = allUsers;
  }

  socket.on("join_room", (data) => {
    let room = socket.id + data.peerId;
    let peer = allUsers.find(user => user.id === data.peerId)

    if (peer) {
      peer.join(room);
      socket.join(room);
      io.to(peer.id).emit("get_username");
      peer.on("send_username", (peerUsername) => {
        socket.emit("room_id", {'name': socket.id, 'room':room, 'peerUsername': peerUsername });
        peer.emit("room_id", {'name': peer.id, 'room':room, 'peerUsername': data.username});
      });
    }else{
      socket.emit("remove_new_chat_request")
    }
  });

  socket.on("find_random_user", () => {
    if(usersQueue[socket.id].length > 1 && socket.id !== usersQueue[socket.id][0].id) {
      let peer = usersQueue[socket.id].shift();
      let notNewUser = socket.rooms.has(socket.id + peer.id) || socket.rooms.has(peer.id+socket.id)
      if (!notNewUser && peer.id !== socket.id) {
        io.to(peer.id).emit("new_chat_request", socket.id);
      }
    } else {
      socket.emit("no_new_user");
    }
  })

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });


  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => {
      socket.to(room).emit("remove_chat", room);
    })
    // queue = queue.filter(user => user.id !== socket.id);
    delete usersQueue[socket.id];
    allUsers = allUsers.filter(user => user.id !== socket.id);
  });
});

server.listen(3001, () => {
});