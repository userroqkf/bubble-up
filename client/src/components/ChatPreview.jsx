import React from "react";
import classNames from "classnames";
import "./ChatPreview.css"

export default function ChatPreview(props) {
  const {onChange, selected, peerUsername, roomData} = props
  // 
  let previewClassName = classNames(
    `chat-preview`,
    {focus: selected}
  )

  return(
    <div className={previewClassName} onClick={() => {
      onChange(roomData)}}>
          <div><b>User: {peerUsername}</b></div>
    </div>
  )
}