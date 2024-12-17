import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from"./components/Landing";
import Login from "./components/LogIn";
import Signup from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";
import Tops from "./components/tops";
import Pants from "./components/pants";
import Skirts from "./components/skirts";
import Shoes from "./components/shoes";
import Bags from "./components/bags";
import Cart from './components/cart';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';




const App = () => {
  return (
    <Router>
      <Routes>
        
      <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route  path="/profile" element={<Profile />} />
         <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/outerwear" element={<Tops />} />
        <Route path="/pants" element={<Pants />} />
        <Route path="/skirts" element={<Skirts />} />
        <Route path="/shoes" element={<Shoes />} />
        <Route path="/bags" element={<Bags />} />
      </Routes>
    </Router>
  );
};

export default App;
