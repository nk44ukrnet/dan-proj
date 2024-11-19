import React, {useEffect, useState, useMemo } from 'react';
import {notLoggedIn} from "../../helpers/notLoggedIn.js";
import Sidebar from "../../compositions/Sidebar/Sidebar.jsx";
import Content from "../../containers/Content/Content.jsx";
import Main from "../../containers/Main/Main.jsx";
import {useParams} from 'react-router-dom';
import {sendRequest} from "../../helpers/sendRequest.js";
import {API} from "../../config/API.js";
import {Link} from "react-router-dom";
import PostMeta from './components/PostMeta.jsx';

const PostView = () => {
    notLoggedIn();
    const {id: postId} = useParams();
    const [postData, setPostData] = useState(null); // State to store the first request data
    // const [userData, setUserData] = useState(null); // State to store the second request data
    const [error, setError] = useState(null); // State to handle any errors
    const [loading, setLoading] = useState(true); // State for loading indicator

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the post data
                const postResponse = await sendRequest(`${API}posts/${postId}`, 'GET');
                setPostData(postResponse);

            } catch (err) {
                setError(err); // Handle errors
            } finally {
                setLoading(false); // End loading state
            }
        };

        fetchData();
    }, [postId]); // Runs when `postId` changes

    const postMetaData = useMemo(() => {
        if (!postData) return null;
        return {
            userFirstName: postData.user.firstName,
            date: postData.date,
            postId,
            userId: postData.user._id,
        };
    }, [postData, postId]);

    // Loading and error states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message || 'Something went wrong.'}</p>;

    return (
        <Main>
            <Sidebar/>
            <Content>
                {postData.imageUrls[0] && <img src={postData.imageUrls[0]} className="img-long" />}
                {postMetaData && (
                    <PostMeta
                        userFirstName={postMetaData.userFirstName}
                        date={postMetaData.date}
                        postId={postMetaData.postId}
                        userId={postMetaData.userId}
                    />
                )}
                <p>
                    {postData.content}
                </p>
                <hr/>
                <h5>Comments:</h5>
            </Content>

        </Main>
    );
};

export default PostView;