import React from 'react';
import {Routes, Route, Link, NavLink} from "react-router-dom";
import Login from '../pages/Auth/Login.jsx'
import Register from '../pages/Auth/Register.jsx'
import Home from '../pages/Home/Home.jsx'

const RoutesList = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
};

export default RoutesList;