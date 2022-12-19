import React from "react";
import ChatMessage from "./ChatMessage";
import "./ChatBox.css"

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
  },
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
  },
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
  },
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
    <div className="chat-box">
      <div className="chat-box-header">
        <img src={require("../img/chat-preview-profile.jpg")} alt="user1"/>
        <h3>Nika Jerrado</h3>
      </div>
      <div className="chat-box-display">
        {testChat.map((chat, index) => {
          return < ChatMessage key={index} chat={chat} />
        })}
      </div>
    <div className="chat-box-footer">
      <textarea rows="2" placeholder="Type a message here:"></textarea>
    </div>
        
    </div>
  )
}