import React from 'react';
import {Routes, Route, Link, NavLink} from "react-router-dom";
import Login from '../pages/Auth/Login.jsx'
import Register from '../pages/Auth/Register.jsx'
import Home from '../pages/Home/Home.jsx'
import PostAdd from "../pages/Post/PostAdd.jsx";

const RoutesList = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post-add" element={<PostAdd />} />
        </Routes>
    );
};

export default RoutesList;