import React, {useEffect, useState} from 'react';
import './App.css';
// import '../src/components/App.css'
// import MainPage from './components/MainPage';
import StartPaqe from './components/StartPage';
import Chat from './components/Chat';

import io from 'socket.io-client';
import ChatBox from './components/ChatBox';
import MainPage from './components/MainPage';

const socket = io.connect("http://localhost:3000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  // const [rooms, setRooms] = useState([]);
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="App">
      {!showChat ? (
        <StartPaqe 
          setShowChat={setShowChat} 
          socket={socket} 
          room={room} 
          // setRoom={setRoom} 
          username={username} 
          setUsername={setUsername}
        />
      ) : (
        <MainPage 
          socket={socket} 
          username={username}
          room={room} 
          setRoom={setRoom} 
          // rooms={rooms}
          // setRooms={setRooms}
        />
      )}
    </div>
  );
}

export default App;
