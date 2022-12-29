import SearchBar from './SearchBar';
import SideBar from './SideBar';
import ChatPreview from './ChatPreview';
import ChatBox from './ChatBox';

import "./MainPage.css"

export default function MainPage(props) {
  const {socket, username, room, setRoom, rooms, setRooms} = props;
  
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      //add rooms array where we can dispaly all rooms connected to the side
      setRooms((prev) => [...prev, rooms]);
      console.log(rooms)
    }
  };

  return(
    <div className='main-page'>
      {/* <RecentChat/> */}
      {/* <SideBar/> */}
      <div className='chat-area'>
      <div className='chat-area-left'>
        <div className='header'>
          <h1>Chat</h1>
          <>
            <input
                type="text"
                placeholder="Room ID..."
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
              />
            <button onClick={joinRoom}>Join A Room</button>
          </>
        </div>
        {rooms.map((room, index) => {
          return <ChatPreview socket={socket} key={index} room={room} />
        })}

      </div>
        <ChatBox 
          socket={socket} 
          username={username}
          room={room}
        />
      </div>
    </div>
  )
}