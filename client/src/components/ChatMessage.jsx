import React from "react";
import classNames from "classnames";
import "./ChatMessage.css"

export default function ChatMessage(props) {
  const { chat, socket } = props;
  const className = classNames(
    socket.id === chat.author ? "" : "recipient"
  )
  console.log("socket id and chat author",socket.id, chat.author)

  return(
    <div className={`chat-message-container ${className}`}>
      {/* {chat.author === "user1" ? <img src={require("../img/chat-preview-profile.jpg")} alt="user1"/> : ""} */}
      <div className={`chat-message ${className}`}>{chat.message}</div>
    </div>
  )
}