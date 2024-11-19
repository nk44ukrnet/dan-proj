import React, {useEffect, useState} from 'react';
import {notLoggedIn} from "../../helpers/notLoggedIn.js";
import Sidebar from "../../compositions/Sidebar/Sidebar.jsx";
import Content from "../../containers/Content/Content.jsx";
import Main from "../../containers/Main/Main.jsx";
import {useParams} from "react-router-dom";
import {sendRequest} from "../../helpers/sendRequest.js";
import {API} from "../../config/API.js";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectorSession} from "../../store/selectors.js";

const PostDelete = () => {
    notLoggedIn();
    const {id: postId} = useParams();

    const [error, setError] = useState(null); // State to handle any errors
    const [loading, setLoading] = useState(true); // State for loading indicator

    let selSession = useSelector(selectorSession);

    useEffect(() => {
        const fetchData = async () => {
            const headers = {
                Authorization: selSession.token,
            };
            try {
                // Fetch the post data
                const postResponse = await sendRequest(`${API}posts/${postId}`, 'DELETE', {}, headers);
            } catch (err) {
                setError(err); // Handle errors
            } finally {
                setLoading(false); // End loading state
            }
        };

        fetchData();
    }, [postId]);

    // Loading and error states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message || 'Something went wrong.'}</p>;

    return (
        <Main>
            <Sidebar/>
            <Content>
                <h3>Post has been successfully deleted.</h3>
                <p>Return to <Link to="/">home</Link>?</p>
            </Content>
        </Main>
    );
};

export default PostDelete;