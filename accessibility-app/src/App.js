import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import RouteSuggestions from './components/RouteSuggestions';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/login';
import './index.css'; // Import Tailwind-enabled CSS file

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/route-suggestions" element={<RouteSuggestions />} />
        <Route path="/login" element={<Login />} /> 
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
