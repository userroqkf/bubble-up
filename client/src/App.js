import React, {useState} from 'react';
import './App.css';
import StartPaqe from './components/StartPage';

import io from 'socket.io-client';
import MainPage from './components/MainPage';

const socket = io.connect("http://localhost:3000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="App">
      {!showChat ? (
        <StartPaqe 
          setShowChat={setShowChat} 
          socket={socket} 
          room={room} 
          username={username} 
          setUsername={setUsername}
        />
      ) : (
        <MainPage 
          socket={socket} 
          username={username}
          room={room} 
          setRoom={setRoom} 
        />
      )}
    </div>
  );
}

export default App;

//TODO: Format Buttons accept decline and join room 