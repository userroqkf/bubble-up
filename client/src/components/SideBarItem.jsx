import React from "react";
import classNames from "classnames";

export default function SideBarItem(props) { 
  let itemClassName = classNames(
    `side-bar-element`,
    {focus: props.selected}
  )
  return (
    <div key={props.key} className={itemClassName} onClick={() => {
      props.onChange(`${props.index}`)
      }} >
      <span className="side-bar-icon"> {props.item.icon} </span>
      {props.item.display}
    </div>
  )
}