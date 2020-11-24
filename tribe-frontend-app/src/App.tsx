import React from 'react';
import TaskCard from './TaskCard/TaskCard'
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
