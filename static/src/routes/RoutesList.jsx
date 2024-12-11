import React from 'react';
import {Routes, Route, Link, NavLink} from "react-router-dom";
import Login from '../pages/Auth/Login.jsx'
import Register from '../pages/Auth/Register.jsx'
import Home from '../pages/Home/Home.jsx'
import PostAdd from "../pages/Post/PostAdd.jsx";
import PostView from "../pages/Post/PostView.jsx"
import PostDelete from "../pages/Post/PostDelete.jsx"
import PostEdit from "../pages/Post/PostEdit.jsx"
import UserView from "../pages/User/UserView.jsx";
import UserEdit from "../pages/User/UserEdit.jsx";
import AwardAdd from "../pages/Award/AwardAdd.jsx";
import AwardView from "../pages/Award/AwardView.jsx";
import AwardList from "../pages/Award/AwardList.jsx";
import AwardDelete from "../pages/Award/AwardDelete.jsx";
import AwardEdit from "../pages/Award/AwardEdit.jsx";

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
            <Route path="/user-view/:id" element={<UserView />} />
            <Route path="/user-edit/:id" element={<UserEdit />} />
            <Route path="/award-add/" element={<AwardAdd />} />
            <Route path="/award-view/:id" element={<AwardView />} />
            <Route path="/award-list/" element={<AwardList />} />
            <Route path="/award-delete/:id" element={<AwardDelete />} />
            <Route path="/award-edit/:id" element={<AwardEdit />} />
        </Routes>
    );
};

export default RoutesList;