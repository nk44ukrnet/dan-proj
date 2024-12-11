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
import AwardsLoop from "../../compositions/PostsLoop/AwardsLoop.jsx";
import {notLoggedIn} from "../../helpers/notLoggedIn.js";


const AwardList = () => {
    notLoggedIn();
    const navigate = useNavigate();
    const user = useSelector(selectorUser);
    const session = useSelector(selectorSession);
    const dispatch = useDispatch();

    return (
        <Main>
            <Sidebar/>
            <Content>
                <h5>Awards List</h5>
                <AwardsLoop />
            </Content>
        </Main>
    );
};

export default AwardList;