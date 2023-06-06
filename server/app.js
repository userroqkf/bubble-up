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

let allUsers = [];
const clientNewUser = {};

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});

io.on("connection", async(socket) => {
  
  socket.broadcast.emit('new_random_user');
  
  const ids = await io.fetchSockets();
  allUsers = ids;

  allUsers.forEach(user => {
    if (clientNewUser.hasOwnProperty(user.id) && user.id !== socket.id) {
      clientNewUser[user.id].add(socket);
    } else {
      const filteredExcludingCurrSocket = allUsers.filter(user => user.id !== socket.id);
      const initialiseSet = new Set(filteredExcludingCurrSocket);
      clientNewUser[user.id] = initialiseSet;
    }
  });

  socket.on("join_room", (data) => {
    let room = socket.id + data.peerId;
    let peer = allUsers.find(user => user.id === data.peerId);

    if (peer) {
      io.to(peer.id).emit("get_username");
      peer.on("send_username", (peerUsername) => {
        console.log("data getusername after joining", data, peerUsername);
        socket.emit("room_id", {'name': socket.id, 'room':room, 'peerUsername': peerUsername, 'peerId': peer.id});
        peer.emit("room_id", {'name': peer.id, 'room':room, 'peerUsername': data.username, 'peerId': socket.id});
      });
    } else {
      socket.emit("remove_new_chat_request");
    }
  });

  socket.on("send_message", (data) => {
    socket.to(data.peerId).emit("receive_message", data);
  });

  socket.on("find_random_user", () => {
    if (clientNewUser[socket.id].size !== 0) {
      // from new user remove random index
      const newUsers = Array.from(clientNewUser[socket.id]);
      const peer = newUsers[Math.floor(Math.random() * newUsers.length)];
      clientNewUser[socket.id].forEach(newUserSocket => {
        if (newUserSocket.id === peer.id) {
          clientNewUser[socket.id].delete(newUserSocket);
        }
      });
      clientNewUser[peer.id].forEach(newUserSocket => {
        if (newUserSocket.id === socket.id) {
          clientNewUser[peer.id].delete(newUserSocket);
        }
      });
      io.to(peer.id).emit("new_chat_request", socket.id);
    }
    if (clientNewUser[socket.id].size === 0) {
      socket.emit("no_new_user");
    }
  });


  socket.on("disconnecting", async() => {
    allUsers.forEach((user) => {
      if (user.self) {
        user.connected = false;
      }
    });

    socket.rooms.forEach((room) => {
      socket.to(room).emit("remove_chat", room);
    });
    delete clientNewUser[socket.id];
    for (const user in clientNewUser) {
      clientNewUser[user].forEach(userSocket => {
        if (userSocket.id === socket.id) {
          clientNewUser[userSocket.id].delete(userSocket);
        }
      });
    }
    const ids = await io.fetchSockets();
    allUsers = ids;
  });
});

server.listen(3001, () => {
});