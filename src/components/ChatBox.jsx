import React from "react";
import ChatMessage from "./ChatMessage";

const testChat = [
  {
    user: "user1",
    message: "Hello! How are you doing?"
  },
  {
    user: "user1",
    message: "I need the some help with blah blah blah"
  },
  {
    user: "user2",
    message:  "sure, I can help you out with that"
  },
  {
    user: "user1",
    message: "thank you so much"
  },
  {
    user: "user1",
    message: "no problem"
  }
]

export default function ChatBox() {
  return(
    <>
     <div className="chat-box-header"></div>
     <div className="chat-box-display">
        {testChat.map((chat, index) => {
          return < ChatMessage key={index} chat={chat} />
        })}
     </div>
     <div className="chat-box-footer"></div>
    </>
  )
}