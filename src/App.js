import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Quack from './pages/quacksite';

  
function App() {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Quack />} />
            </Routes>
        </Router>
    );
}

export default App;
