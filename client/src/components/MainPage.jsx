import React, {useState, useEffect} from 'react';
import SearchBar from './SearchBar';
import SideBar from './SideBar';
import ChatPreview from './ChatPreview';
import ChatBox from './ChatBox';

import "./MainPage.css"

export default function MainPage(props) {
  const {socket, username, room, setRoom} = props;

  const [focusRoom, setFocusRoom] = useState("");

  const [newIncomingChat, setnewIncomingChat] = useState(false)

  const [chatRequestData, setChatRequestData] = useState();

  const [newRandomUser, setnewRandomUser] = useState(true);

  const [rooms, setRooms] = useState([]);
  
  const joinRoom =  (data) => {
    console.log("join room button clicked")
    socket.emit("join_room", data);
      // let room = socket.id+data;
  };

  useEffect(() => {
    socket.on("room_id", (data) => {
      // console.log("room id socket", socket.id)
      // console.log("room id data", data.name)
      // console.log("client room id", data.room)
      setnewIncomingChat(false);
      // console.log("before setrooms",rooms)
      setRooms((prev) => [...prev, data.room]);
      setFocusRoom(data.room);
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
    return () => {
      socket.off("new_chat_request");
    };
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
      console.log("remove_chat data", data)
      setRooms((prev) => prev.filter(room => {
        console.log("room inside filter", room)
        return room !== data
    }));
      console.log("remove chat rooms",rooms)
      setFocusRoom();
    })
    return () => {
      socket.off("remove_chat");
    };
  }, [socket, rooms])


  const findRandomUser = () => {
    socket.emit("find_random_user");
  };



  // socket.on("room_id", data => {
  //   console.log("client show",data, socket.id);
  // })

  // const joinRoom = async (data) => {
  //   if (room !== "") {
  //     await socket.emit("join_room", data);
  //     await socket.on("room_id", (room) => {
  //       console.log("room_id", room)
  //       console.log("joined room id", socket.id);
  //       setRooms((prev) => [...prev, room]);
  //       setFocusRoom(room);
  //     })
  //   }
  // };





  return(
    <div className='main-page'>
      {/* <RecentChat/> */}
      {/* <SideBar/> */}
      <div className='chat-area'>
      <div className='chat-area-left'>
        <div className='header'>
          <h1>Bubble-up</h1>
            {/* <input
                type="text"
                placeholder="Room ID..."
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
              /> */}
          {newRandomUser ? <button onClick={findRandomUser}>Join A Room</button> : <div> No New User </div>}
        </div>
      {newIncomingChat &&
        <div>
          new chat incoming 
          <button onClick={() => {
            joinRoom(chatRequestData)
          }}> accpet </button>
          <button onClick={() => {
            console.log("join room button clicked") 
            setnewIncomingChat(false)}
          }
          > decline </button>
        </div>
        }
        {rooms.map((room, index) => {
          console.log("map index", index)
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