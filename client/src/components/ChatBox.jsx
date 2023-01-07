import React, { useState, useEffect }from "react";
import ChatMessage from "./ChatMessage";
import "./ChatBox.css"


export default function ChatBox(props) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const { socket, username, room, focusRoom, peerUsername }  = props;

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: focusRoom,
        author: socket.id,
        username: username,
        message: currentMessage,
      };

      await socket.emit("send_message", messageData);
      setMessageList((prev) => [...prev, messageData]);
      setCurrentMessage("");
    }
  };

  
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((prev) => [...prev, data]);
    });
    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  return(
    <div className="chat-box">
      <div className="chat-box-header">
        {/* <img src={require("../img/chat-preview-profile.jpg")} alt="user1"/> */}
        <h3>{peerUsername}</h3>
      </div>
      <div className="chat-box-display">
        {messageList
          .filter(chat => chat.room === focusRoom)
          .map((chat, index) => {
            return < ChatMessage key={index} chat={chat} socket={socket} />
          })}
      </div>
    <div className="chat-box-footer">
      <textarea
        type="text"
        rows={2}
        value={currentMessage}
        placeholder="Type a message here:"
        onChange={(e) => {
          setCurrentMessage(e.target.value);
        }}
        onKeyDown={(e) => {
          if(e.key === "Enter")
            {
              e.preventDefault();
              sendMessage()
            }
          }
        }
      />
    </div>
        
    </div>
  )
}