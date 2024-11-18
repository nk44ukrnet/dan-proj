import React, {useEffect, useState} from 'react';
import {notLoggedIn} from "../../helpers/notLoggedIn.js";
import Sidebar from "../../compositions/Sidebar/Sidebar.jsx";
import Content from "../../containers/Content/Content.jsx";
import Main from "../../containers/Main/Main.jsx";
import {useParams} from 'react-router-dom';
import {sendRequest} from "../../helpers/sendRequest.js";
import {API} from "../../config/API.js";
import {Link} from "react-router-dom";
import PostMeta from './components/PostMeta.jsx'

const PostView = () => {
    notLoggedIn();
    const {id: postId} = useParams();
    const [postData, setPostData] = useState(null); // State to store the first request data
    const [userData, setUserData] = useState(null); // State to store the second request data
    const [error, setError] = useState(null); // State to handle any errors
    const [loading, setLoading] = useState(true); // State for loading indicator

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the post data
                const postResponse = await sendRequest(`${API}posts/${postId}`, 'GET');
                setPostData(postResponse);


                // Fetch the user data based on the post's user ID
                // if (postResponse.user && postResponse.user._id) {
                //     const userResponse = await sendRequest(`${API}users/${postResponse.user._id}`, 'GET');
                //     setUserData(userResponse);
                // }
            } catch (err) {
                setError(err); // Handle errors
            } finally {
                setLoading(false); // End loading state
            }
        };

        fetchData();
    }, [postId]); // Runs when `postId` changes

    console.log(postData)
    // Loading and error states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message || 'Something went wrong.'}</p>;

    return (
        <Main>
            <Sidebar/>
            <Content>
                {postData.imageUrls[0] && <img src={postData.imageUrls[0]} className="img-long" />}
                <PostMeta
                    userFirstName={postData.user.firstName}
                    userLastName={postData.userFirstName}
                    date={postData.date}
                    postId={postId}
                />
                <p>By <Link to={`/user-view/${postData.user['_id']}`}>{postData.user.firstName}</Link> on {new Date(postData.date).toLocaleDateString()}</p>
            </Content>

        </Main>
    );
};

export default PostView;