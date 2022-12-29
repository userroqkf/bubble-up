import React from "react";
import "./StartPage.css"
export default function StartPaqe(props) {
  // props.findRandomUser("nothing")
  const { setShowChat, socket, room, setRoom, username, setUsername } = props;
  // const joinRoom = () => {
  //   if (username !== "" && room !== "") {
  //     socket.emit("join_room", room);
  //     //add rooms array where we can dispaly all rooms connected to the side
  //     setShowChat(true);
  //   }
  // };

  const joinMainPage = () => {
    if(username !== "") {
      setShowChat(true);
    }
  }

  return(
    <div className="joinChatContainer">
      <div class="wrapper">
            <h1>Bubble Up</h1>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
      </div>
      <div className="start-page-user-input">
        <input
          type="text"
          placeholder="John..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        {/* <input
          type="text"
          placeholder="Room ID..."
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        /> */}
        <button onClick={joinMainPage}>Start Chatting</button>
      </div>
    </div>
  )
}