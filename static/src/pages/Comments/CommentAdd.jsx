import React, {useRef, useState} from 'react';
import Sidebar from "../../compositions/Sidebar/Sidebar.jsx";
import Content from "../../containers/Content/Content.jsx";
import Main from "../../containers/Main/Main.jsx";
import {Link, useParams, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectorUser, selectorSession} from "../../store/selectors.js";
import {sendRequest} from "../../helpers/sendRequest.js";
import {API} from "../../config/API.js";


const CommentAdd = () => {
    const {id: postId} = useParams();
    const textRef = useRef();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const selUser = useSelector(selectorUser);
    const selSession = useSelector(selectorSession);

    const headers = {
        Authorization: selSession.token,
        user: selUser._id,
    };

    async function handleSubmit(e) {
        e.preventDefault();
        console.log('default prevented');

        const content = textRef.current.value.trim();

        if (!content) {
            setError('Comment cannot be empty');
            return;
        }

        const body = {
            content: content,
            post: postId
        };

        try {
            const response = await sendRequest(
                `${API}comments`,
                'POST',
                {body: JSON.stringify(body)},
                headers);
          navigate(`/post-view/${postId}`);

        } catch (e) {
            console.log(e)
        }

    }
    return (
        <Main>
            <Sidebar/>
            <Content>
                <h5>Add Comment</h5>
                <form onSubmit={handleSubmit}>
                    <textarea name="content" cols="30" rows="10" className="mb" placeholder="Add comment here" ref={textRef}></textarea>
                    <input type="hidden" name="post" value={postId}/>
                    {error && <p className="error">{error}</p>}
                    <div className="casual-flex-inline">
                        <button type="submit" className="btn-link transition1">Add comment</button>
                        <Link to={`/post-view/${postId}`} className="btn-link-error transition1 text-decoration-none">Cancel</Link>
                    </div>
                </form>
            </Content>
        </Main>
    );
};

export default CommentAdd;