import React, {useState} from "react";
import "./SideBar.css"
import SideBarItem from "./SideBarItem";
import profilePicture from "../img/profile-picture.jpg"

export default function SideBar(props) {

  const sideBarNavItems = [
    {
      display: 'HOME',
      icon: <i class="fa-solid fa-house"></i>
    },
    {
      display: 'CHAT',
      icon: <i class="fa-regular fa-comment"></i>
    },
    {
      display: 'CONTACT',
      icon: <i class="fa-solid fa-user"></i>
    }
  ]

  const [focus, setFocus] = useState("0");

  return (
    //TODO: format side bar and change side-bar-itmes className 
    <div className="side-bar">
      <div className="side-bar-item">
        <div id="user-profile-picture">
          <img src={profilePicture} alt="profile"/>
          <>USER NAME</>
        </div>
        <div>
          {sideBarNavItems.map((item,index) => {
            return (
              <SideBarItem key={index} focus={focus} onChange={setFocus} item={item} index={index} selected={
                parseInt(focus) === index
              } />
            )
          })}
        </div>
      </div>
      <div className="logout">
        <i className="fa-solid fa-power-off side-bar-icon"></i>
        Log Out
      </div>
    </div>
  )
}