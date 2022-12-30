import React, { useState, useEffect }from "react";
import ChatMessage from "./ChatMessage";
import "./ChatBox.css"


export default function ChatBox(props) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const { socket, username, room, focusRoom }  = props;

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        //changed room to focusRoom
        room: focusRoom,
        author: username,
        message: currentMessage,
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  
  useEffect(() => {
    socket.on("message_sent", (data) => {
      console.log("message_sent",data)
      console.log("focus room", focusRoom)
      if(data.room === focusRoom) {
        setMessageList((list) => [...list, data]
        );
      }
    });
    return () => {
      socket.off("receive_message");
    };
  }, []);


  return(
    <div className="chat-box">
      <div className="chat-box-header">
        <img src={require("../img/chat-preview-profile.jpg")} alt="user1"/>
        <h3>{focusRoom}</h3>
      </div>
      <div className="chat-box-display">
        {messageList
          .map((chat, index) => {
            return < ChatMessage key={index} chat={chat} username={username} />
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