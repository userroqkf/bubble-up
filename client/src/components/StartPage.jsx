import React, {useState} from "react";
import "./StartPage.css"


export default function StartPaqe(props) {
  const { setShowChat, username, setUsername } = props;

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

        <button onClick={joinMainPage}>Start Chatting</button>
      </div>
    </div>
  )
}