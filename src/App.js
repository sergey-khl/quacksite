import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Quack from './pages/quack';
import Report1 from './pages/report1';
// report 2 is pdf rn
import Report3 from './pages/report3';
import Report4 from './pages/report4';


function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Quack/>} />
      <Route path="/1" element={<Report1/>} />
      <Route path="/3" element={<Report3/>} />
      <Route path="/4" element={<Report4/>} />
      
    </Routes>
  );
}

export default App;
