import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Quack from './pages/quack';
import Report1 from './pages/report1';
import Report2 from './pages/report2';


function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Quack/>} />
      <Route path="/1" element={<Report1/>} />
      <Route path="/2" element={<Report2/>} />
      
    </Routes>
  );
}

export default App;
