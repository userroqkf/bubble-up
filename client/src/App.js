import React, {useEffect, useState} from 'react';
// import './App.css';
import '../src/components/App.css'
// import MainPage from './components/MainPage';
import StartPaqe from './components/StartPage';
import Chat from './components/Chat';

import io from 'socket.io-client';

const socket = io.connect("http://localhost:3000");


function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);


  return (
    <div className="App">
      {!showChat ? (
        <StartPaqe setShowChat={setShowChat} socket={socket} room={room} setRoom={setRoom}/>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
