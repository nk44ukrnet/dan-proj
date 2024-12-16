import React, {useEffect} from 'react';
import Sidebar from "../../compositions/Sidebar/Sidebar.jsx";
import Content from "../../containers/Content/Content.jsx";
import Main from "../../containers/Main/Main.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useParams} from 'react-router-dom';
import {sendRequest} from "../../helpers/sendRequest.js";
import {useSelector} from "react-redux";
import {selectorSession, selectorUser} from "../../store/selectors.js";
import {API} from "../../config/API.js";

const CommentDelete = () => {
    const {id: commentId} = useParams();

    const selUser = useSelector(selectorUser);
    const selSession = useSelector(selectorSession);
    const navigate = useNavigate();


    const headers = {
        Authorization: selSession.token,
        user: selUser._id,
    };

    useEffect(() => {


        // Add logic here
        async function delComment() {
            try {
                const response = await sendRequest(`${API}comments/${commentId}`, 'DELETE', '', headers);
                console.log(response);
            } catch (e) {
                console.log(e);
            }
        }
        delComment();
    }, [commentId]);

    return (
        <Main>
            <Sidebar/>
            <Content>
                <h5>Comment has been deleted</h5>
                <p>Go back <Link to={`/`}>latest posts</Link>?</p>
            </Content>
        </Main>
    );
};

export default CommentDelete;