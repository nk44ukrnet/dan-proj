import React, {useEffect, useRef, useState} from 'react';
import Sidebar from "../../compositions/Sidebar/Sidebar.jsx";
import Content from "../../containers/Content/Content.jsx";
import Main from "../../containers/Main/Main.jsx";
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectorSession, selectorUser} from "../../store/selectors.js";
import {API} from '../../config/API.js'
import {sendRequest} from "../../helpers/sendRequest.js";
import {useNavigate} from "react-router-dom";

const CommentEdit = () => {
    const textRef = useRef();
    const [error, setError] = useState('');
    const {id: commendId} = useParams();
    const [comment, setComment] = useState('');
    const navigate = useNavigate();


    const selUser = useSelector(selectorUser);
    const selSession = useSelector(selectorSession);

    const headers = {
        Authorization: selSession.token,
        user: selUser._id,
    };

    useEffect(() => {
        async function fetchData() {

            try {
                const response = await sendRequest(`${API}comments`, 'GET');
                const filtered = response.filter((comment) => comment._id === commendId);

                if(filtered.length > 0){
                    setComment(filtered[0].content);
                }
            } catch (e) {
                console.log(e);
            }
        }

        fetchData()
    }, [commendId])

    // Handle changes in the textarea
    const handleInputChange = (e) => {
        setComment(e.target.value);
    };



    async function handleSubmit(e){
        e.preventDefault();

        const body = {
            content: comment
        }
        try {
            const response = await sendRequest(`${API}comments/${commendId}`, 'PUT', {body: JSON.stringify(body)}, headers);
            navigate(`/post-view/${response.post}`);
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Main>
            <Sidebar/>
            <Content>
                <h5>Edit Comment</h5>
                <form onSubmit={handleSubmit}>
                    <textarea name="content" cols="30" rows="10" className="mb" placeholder="Add comment here"
                              ref={textRef} value={comment} onChange={handleInputChange}></textarea>
                    {error && <p className="error">{error}</p>}
                    <div className="casual-flex-inline">
                        <button type="submit" className="btn-link transition1">Edit</button>
                        <Link to={`/comment-delete/${commendId}`}
                              className="btn-link-error transition1 text-decoration-none">Delete</Link>
                    </div>
                </form>
            </Content>
        </Main>
    );
};

export default CommentEdit;