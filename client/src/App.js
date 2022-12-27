import React, {useEffect, useState} from 'react';
import './App.css';
import MainPage from './components/MainPage';

function App() {
  const [test, setTest] = useState()

  useEffect(() => {
    fetch('/test')
      .then((res) => res.json())
      .then(data => {setTest(data.test)})
      }, [])

  return (
    <>
    <MainPage/>
    <h1>{test}</h1>
    </>
  );
}

export default App;
