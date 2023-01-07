import React, {useState, useEffect} from 'react';
import SearchBar from './SearchBar';
import SideBar from './SideBar';
import ChatPreview from './ChatPreview';
import ChatBox from './ChatBox';

import "./MainPage.css"
import { useReducer } from 'react';

export default function MainPage(props) {
  const {socket, username, room, setRoom} = props;

  const [focusRoom, setFocusRoom] = useState("");

  const [newIncomingChat, setnewIncomingChat] = useState(false)

  const [chatRequestData, setChatRequestData] = useState();

  const [newRandomUser, setnewRandomUser] = useState(true);

  const [rooms, setRooms] = useState([]);

  const [peerUsername, setPeerUsername] = useState("");
  
  const joinRoom =  (data) => {
    socket.emit("join_room", {peerId:data, username: username});
  };

  useEffect(() => {
    socket.on("get_username", () => {
      socket.emit("send_username", username);
    })
    return () => {
      socket.off("get_username");
    };
  }, [socket, username])

  useEffect(() => {
    socket.on("room_id", (data) => {
      setnewIncomingChat(false);
      setRooms((prev) => [...prev, data]);
      setFocusRoom(data);
      // setPeerUsername(data.peerUsername);
    })
    return () => {
      socket.off("room_id");
    };
  }, [socket])

  useEffect(() => {
    socket.on("new_chat_request", (data) => {
      setChatRequestData(data);
      setnewIncomingChat(true);
    })
    // return () => {
    //   socket.off("new_chat_request");
    // };
  }, [socket])

  useEffect(() => {
    socket.on("no_new_user", () => {
      setnewRandomUser(false);
    }) 
    return () => {
      socket.off("no_new_user");
    };
  }, [socket])

  useEffect(() => {
    socket.on("new_random_user", () => {
      console.log("new random user client")
      setnewRandomUser(true);
    }) 
    return () => {
      socket.off("new_random_user");
    };
  }, [socket])
  useEffect(() => {
  socket.on("remove_new_chat_request", () => {
    setnewIncomingChat(false)
  })
  return () => {
    socket.off("remove_new_chat_request");
  };
  }, [socket])

  useEffect(() => {
    socket.on("remove_chat", (data) => {
      
      setRooms((prev) => prev.filter(roomData => {
        
        return roomData.room !== data
    }));
      
      setFocusRoom();
    })
    return () => {
      socket.off("remove_chat");
    };
  }, [socket, rooms])


  const findRandomUser = () => {
    socket.emit("find_random_user");
  };

  return(
    <div className='main-page'>
      <div className='chat-area'>
      <div className='chat-area-left'>
        <div className='header'>
          <h1>Bubble-up</h1>
          {newRandomUser ? <button onClick={findRandomUser}>Join A Room</button> : <div> No New User </div>}
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
        />}
      </div>
    </div>
  )
}