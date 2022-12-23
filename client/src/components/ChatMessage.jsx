import React from "react";
import classNames from "classnames";
import "./ChatMessage.css"

export default function ChatMessage(props) {
  const className = classNames(
    props.chat.user === "user2" ? "" : "recipient"
  )
  return(
    <div className={`chat-message-container ${className}`}>
      {props.chat.user === "user1" ? <img src={require("../img/chat-preview-profile.jpg")} alt="user1"/> : ""}
      <div className={`chat-message ${className}`}>{props.chat.message}</div>
    </div>
  )
}