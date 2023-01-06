import React from "react";
import classNames from "classnames";
import "./ChatPreview.css"
import chatPreveiwProfile from "../img/chat-preview-profile.jpg"

export default function ChatPreview(props) {
  const {socket, room, focusRoom, onChange, index, selected} = props
  // console.log("show what room is", room)
  let previewClassName = classNames(
    `chat-preview`,
    {focus: selected}
  )

  return(
    <div className={previewClassName} onClick={() => {onChange(`${room}`)}}>
      <div className="chat-header">
        <div className="chat-profile">
          <img id="chat-profile-img" src={chatPreveiwProfile} alt="profile"/>
          <div><b>{room}</b></div>
        </div>
        <div className="chat-ago">
          chat index {index}
        
          {/* 1min ago */}
        </div>
      </div>
      <div className="chat-message">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a aliquet ex. 
      Aliquam erat volutpat. Curabitur vitae venenatis nisl. Curabitur ut justo placerat, 
      pulvinar augue eu, fringilla nibh. 
      </div>
    </div>
  )
}