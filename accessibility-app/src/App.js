import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import RouteSuggestions from './components/RouteSuggestions';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/route-suggestions" element={<RouteSuggestions />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
