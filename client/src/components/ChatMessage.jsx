import React from "react";
import classNames from "classnames";
import "./ChatMessage.css"

export default function ChatMessage(props) {
  const { chat, username } = props;
  const className = classNames(
    username === chat.author ? "" : "recipient"
  )
  return(
    <div className={`chat-message-container ${className}`}>
      {/* change this to username === chat.author */}
      {chat.author === "user1" ? <img src={require("../img/chat-preview-profile.jpg")} alt="user1"/> : ""}
      <div className={`chat-message ${className}`}>{chat.message}</div>
    </div>
  )
}