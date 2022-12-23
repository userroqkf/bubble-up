import React from "react";
import "./ChatPreview.css"
import chatPreveiwProfile from "../img/chat-preview-profile.jpg"

export default function ChatPreview() {
  return(
    <div className="chat-preview">
      <div className="chat-header">
        <div className="chat-profile">
          <img id="chat-profile-img" src={chatPreveiwProfile} alt="profile"/>
          <div><b>First Last</b></div>
        </div>
        <div className="chat-ago">
          1min ago
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