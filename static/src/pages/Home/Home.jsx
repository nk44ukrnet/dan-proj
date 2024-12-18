import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {selectorUser, selectorSession} from "../../store/selectors.js";
import {useNavigate} from "react-router-dom";
import {sendRequest} from "../../helpers/sendRequest.js";
import {API} from '../../config/API.js'
import Main from "../../containers/Main/Main.jsx";
import Sidebar from "../../compositions/Sidebar/Sidebar.jsx";
import {useDispatch} from "react-redux";
import {setUser} from "../../store/index.js";
import Content from "../../containers/Content/Content.jsx";
import PostsLoop from "../../compositions/PostsLoop/PostsLoop.jsx";


const Home = () => {
    const navigate = useNavigate();
    const user = useSelector(selectorUser);
    const session = useSelector(selectorSession);
    const dispatch = useDispatch();


    useEffect(() => {
        // Redirect if session is not available
        if (!session) {
            navigate('/register');
            return;
        }
        const fillUser = sendRequest(`${API}users/${session.id}`, 'GET')
            .then(res => dispatch(setUser(res)))
            .catch(err => console.log(err));


    }, [session, navigate]);



    return (
        <Main>
            <Sidebar/>
            <Content>
                <h5>Latest Posts</h5>
                <PostsLoop />
            </Content>
        </Main>
    );
};

export default Home;