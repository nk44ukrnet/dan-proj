import React from 'react';
import {Routes, Route, Link, NavLink} from "react-router-dom";
import Login from '../pages/Auth/Login.jsx'
import Register from '../pages/Auth/Register.jsx'
import Home from '../pages/Home/Home.jsx'
import PostAdd from "../pages/Post/PostAdd.jsx";
import PostView from "../pages/Post/PostView.jsx"
import PostDelete from "../pages/Post/PostDelete.jsx"
import PostEdit from "../pages/Post/PostEdit.jsx"

const RoutesList = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post-add" element={<PostAdd />} />
            <Route path="/post-view/:id" element={<PostView />} />
            <Route path="/post-delete/:id" element={<PostDelete />} />
            <Route path="/post-edit/:id" element={<PostEdit />} />
        </Routes>
    );
};

export default RoutesList;