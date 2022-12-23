import React, {useEffect, useState} from 'react';
import './App.css';
import MainPage from './components/MainPage';

function App() {
  const [test, setTest] = useState()

  useEffect(() => {
    fetch('http://localhost:3000/')
      .then((res) => res.json())
      .then(data => setTest(data.test))
      }, [])

  return (
    <MainPage/>
  );
}

export default App;
