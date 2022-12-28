import React, {useState} from "react";

export default function StartPaqe(props) {
  const [username, setUsername] = useState("");
  // props.findRandomUser("nothing")
  const { setShowChat, socket, room, setRoom } = props;
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return(
    <div className="joinChatContainer">
      <h3>Join A Chat</h3>
      <input
        type="text"
        placeholder="John..."
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Room ID..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}>Join A Room</button>
    </div>
  )
}