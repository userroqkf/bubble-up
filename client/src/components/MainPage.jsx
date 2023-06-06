import React, {useState, useEffect} from 'react';
import ChatPreview from './ChatPreview';
import ChatBox from './ChatBox';

import "./MainPage.css"

export default function MainPage(props) {
  const {socket, username, room} = props;

  const [focusRoom, setFocusRoom] = useState("");

  const [newIncomingChat, setnewIncomingChat] = useState(false)

  const [chatRequestData, setChatRequestData] = useState();

  const [newRandomUser, setnewRandomUser] = useState(true);

  const [rooms, setRooms] = useState([]);
  
  useEffect(() => {

    console.log("rooms useeffect", rooms);

    function sendUsername() {
      socket.emit("send_username", username);
    }

    function roomId(data) {
      setnewIncomingChat(false);
      const found = rooms.some(el => el.room === data.room);
      if (!found) {
        setRooms((prev) => [...prev, data]);
      }
      setFocusRoom(data);
    }

    function newChatRequest(data) {
      setChatRequestData(data);
      setnewIncomingChat(true);
    }

    function noNewUser() {
      setnewRandomUser(false);
    }
  

    function newRandomUser() {
      setnewRandomUser(true);
    }

    function removeNewChatRequest() {
      setnewIncomingChat(false)
    }
    socket.on("get_username",sendUsername)
    socket.on("room_id", (data) => roomId(data))
    socket.on("new_chat_request", (data) => newChatRequest(data))
    socket.on("no_new_user", noNewUser)
    socket.on("new_random_user", newRandomUser)
    socket.on("remove_new_chat_request",removeNewChatRequest)

    return () => {
      socket.off("get_username")
      socket.off("room_id")
      socket.off("new_chat_request")
      socket.off("no_new_user")
      socket.off("new_random_user")
      socket.off("remove_new_chat_request")
    };

  }, [rooms, socket,username, room])

  useEffect(() => {
    socket.on("remove_chat", (data) => {
      setRooms((prev) => prev.filter(roomData => {
        return roomData.room !== data
    }));
      if (rooms) {
        const randRoom = rooms[Math.floor(Math.random()*rooms.length)];
        setFocusRoom(randRoom);
      } else {
        setFocusRoom("")
    }
    })

    return () => {
      socket.off("reove_chat")
    }
  }, [rooms, socket])

  const joinRoom =  (data) => {
    socket.emit("join_room", {peerId:data, username: username});
  };

  const findRandomUser = () => {
    socket.emit("find_random_user");
  };

  return(
    <div className='main-page'>
      <div className='chat-area'>
      <div className='chat-area-left'>
        <div className='header'>
          <h1>Bubble-up</h1>
          {newRandomUser ? <button onClick={() => {
            console.log('clicked')
            findRandomUser()
          }
          }>Join A Room</button> : <div> No New User </div>}
        </div>
      {newIncomingChat &&
        <div>
          new chat incoming 
          <button onClick={() => {
            joinRoom(chatRequestData)
          }}> accpet </button>
          <button onClick={() => {
            
            setnewIncomingChat(false)}
          }
          > decline </button>
        </div>
        }
        {rooms.map((roomData, index) => {
          
          return (
            <ChatPreview 
              socket={socket}
              key={index}
              roomData={roomData} 
              onChange={setFocusRoom}
              peerUsername={roomData.peerUsername}
              selected={focusRoom.room === roomData.room}
            />
          )
        })}

      </div>
        {focusRoom && <ChatBox 
          socket={socket} 
          username={username}
          room={room}
          focusRoom={focusRoom.room}
          peerUsername={focusRoom.peerUsername}
          peerId={focusRoom.peerId}
        />}
      </div>
    </div>
  )
}