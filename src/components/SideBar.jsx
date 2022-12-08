import classNames from "classnames";
import React, { useState } from "react";
import "./SideBar.css"

export default function SideBar() {

  const [pressed, setPressed] = useState(false);

  let className = classNames(
    "side-bar-element"
    // "selected": props.selected
  );


  return (
    <>
      <div className={className}>
        <i class="fa-regular fa-house-user"></i>
        HOME 
      </div>
      <div className={className}>
        <i class="fa-regular fa-comment"></i>
        CHAT 
      </div>
      <div className={className}>

        CONTACT 
      </div>
      <div className={className}>
        <i class="fa-regular fa-bell"></i>
        NOTIFICATION 
      </div>
      <div className={className}>
        <i class="fa-regular fa-calendar"></i>
        CALENDAR 
      </div>
      <div className={className}>
        <i class="fa-regular fa-gear"></i>
        SETTINGS 
      </div>
    </>
  )
}