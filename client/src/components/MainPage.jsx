import React, {useState, useEffect} from 'react';
import SearchBar from './SearchBar';
import SideBar from './SideBar';
import ChatPreview from './ChatPreview';
import ChatBox from './ChatBox';

import "./MainPage.css"

export default function MainPage(props) {
  const {socket, username, room, setRoom, rooms, setRooms} = props;

  const [focusRoom, setFocusRoom] = useState("");
  
  const joinRoom = async (e) => {
    e.preventDefault();
    if (room !== "") {
      await socket.emit("join_room");
      await socket.on("room_id", (room) => {
        console.log("room_id", room)
        setRooms((prev) => [...prev, room]);
        setFocusRoom(room);
      })
    }
  };

  return(
    <div className='main-page'>
      {/* <RecentChat/> */}
      {/* <SideBar/> */}
      <div className='chat-area'>
      <div className='chat-area-left'>
        <div className='header'>
          <h1>Bubble-up</h1>
            <input
                type="text"
                placeholder="Room ID..."
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
              />
            <button onClick={joinRoom}>Join A Room</button>
        </div>
        {rooms.map((room, index) => {
          return (
            <ChatPreview 
              socket={socket}
              key={index}
              room={room} 
              focusRoom={focusRoom}
              onChange={setFocusRoom}
              index={index}
              selected={(focusRoom) === room}
            />
          )
        })}

      </div>
        <ChatBox 
          socket={socket} 
          username={username}
          room={room}
          focusRoom={focusRoom}
        />
      </div>
    </div>
  )
}