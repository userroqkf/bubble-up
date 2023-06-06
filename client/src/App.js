import React, {useState} from 'react';
import './App.css';
import StartPaqe from './components/StartPage';

import io from 'socket.io-client';
import MainPage from './components/MainPage';

const URL = "http://localhost:3000"
const socket = io.connect(URL, {autoConnect: false});

function App() {
  const [username, setUsername] = useState("");
  const [usernameAlreadySelected, setUsernameAlreadySelected] = useState(false)
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
          setUsernameAlreadySelected={setUsernameAlreadySelected}
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