import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home'; // Ensure Home is exported as default
import RouteSuggestions from './components/RouteSuggestions'; // Check RouteSuggestions
import Header from './components/Header'; // Check Header
import Footer from './components/Footer'; // Check Footer
import Login from './components/login'; // Check Login
import SignUp from './components/signup'; // Check SignUp
import MyMap from './components/MyMap'; // Ensure MyMap is exported as default
import './index.css'; // Import Tailwind-enabled CSS file

const App = () => {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/route-suggestions" element={<RouteSuggestions />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/map" element={<MyMap />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
