import React, {useState} from "react";
import "./StartPage.css"


export default function StartPaqe(props) {
  const { setShowChat, username, setUsername, setUsernameAlreadySelected, socket } = props;

  const joinMainPage = () => {
    if(username !== "") {
      setShowChat(true);
      setUsernameAlreadySelected(true)
      socket.auth = { username };
      socket.connect();
    }
  }

  return(
    <div className="joinChatContainer">
      <div className="wrapper">
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

        <button onClick={joinMainPage}>Start Chatting</button>
      </div>
    </div>
  )
}