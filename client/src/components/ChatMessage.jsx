import React from "react";
import classNames from "classnames";
import "./ChatMessage.css"

export default function ChatMessage(props) {
  const { chat, socket } = props;
  const className = classNames(
    socket.id === chat.author ? "" : "recipient"
  )

  return(
    <div className={`chat-message-container ${className}`}>
      <div className={`chat-message ${className}`}>{chat.message}</div>
    </div>
  )
}