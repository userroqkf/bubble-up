
const joinRoom =  (socket, data, username) => {
  socket.emit("join_room", {peerId:data, username: username});
};

const getUsername = (socket, username) => {
  socket.on("get_username", () => {
    socket.emit("send_username", username);
  })
}

const roomId = (socket, rooms, setnewIncomingChat, setRooms, setFocusRoom) => {
  socket.on("room_id", (data) => {
    setnewIncomingChat(false);
    const found = rooms.some(el => el.room === data.room);
    if (!found) {
      setRooms((prev) => [...prev, data]);
    }
    setFocusRoom(data);
    })
}

const newChatRequest = (socket, setChatRequestData, setnewIncomingChat) => {
  socket.on("new_chat_request", (data) => {
    setChatRequestData(data);
    setnewIncomingChat(true);
  })
}

const noNewUser = (socket, setnewRandomUser) => {
  socket.on("no_new_user", () => {
    setnewRandomUser(false);
  }) 
}

const newRandomUserFn = (socket, setnewRandomUser) => {
  socket.on("new_random_user", () => {
    setnewRandomUser(true);
  }) 
}

const removeNewChatRequest = (socket, setnewIncomingChat) => {
  socket.on("remove_new_chat_request", () => {
    setnewIncomingChat(false)
  })
}

const removeChat = (socket, setRooms, rooms, setFocusRoom) => {
  socket.on("remove_chat", (data) => {
    setRooms((prev) => prev.filter(roomData => {
      return roomData.room !== data
  }));
    if (rooms) {
      const randRoom = rooms[Math.floor(Math.random()*rooms.length)];
      setFocusRoom(randRoom);
    } else {
      setFocusRoom("")
  }
})
}

const findRandomUser = (socket) => {
  socket.emit("find_random_user");
};

module.exports = {
  joinRoom,
  getUsername,
  roomId,
  newChatRequest,
  noNewUser,
  newRandomUserFn,
  removeNewChatRequest,
  removeChat,
  findRandomUser,
};