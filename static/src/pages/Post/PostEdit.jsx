import React, {useRef, useState, useEffect} from 'react';
import {notLoggedIn} from "../../helpers/notLoggedIn.js";
import {useIsCurrentUserOrAdmin} from '../../customHooks/useIsCurrentUserOrAdmin.js'
import {useSelector} from "react-redux";
import {selectorSession, selectorUser} from "../../store/selectors.js";
import Sidebar from "../../compositions/Sidebar/Sidebar.jsx";
import Content from "../../containers/Content/Content.jsx";
import Main from "../../containers/Main/Main.jsx";
import {useNavigate, useParams} from 'react-router-dom';
import ImageUpload from "../../components/ImageUpload/ImageUpload.jsx";
import Button from "../../components/Button/Button.jsx";
import {sendRequest} from "../../helpers/sendRequest.js";
import {API} from "../../config/API.js";

const PostEdit = () => {
    notLoggedIn();
    const {id: postId} = useParams();
    const selUser = useSelector(selectorUser);
    const canEdit = useIsCurrentUserOrAdmin(selUser._id);
    const navigate = useNavigate();
    const textAreaRef = useRef();
    const btnRef = useRef();

    const [imageUrl, setImageUrl] = useState(''); // State to store image URL
    const [content, setContent] = useState(''); // State for textarea value
    const [error, setError] = useState(null); // State to handle any errors
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [postData, setPostData] = useState(null); // Request post data

    function handleSubmit(e){
        e.preventDefault();
    }

    const handleImageUpload = (url) => {
        setImageUrl(url); // Update state with the uploaded image URL
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the post data
                const postResponse = await sendRequest(`${API}posts/${postId}`, 'GET');
                setPostData(postResponse);

                // Update the textarea and image URL only if data exists
                if (postResponse) {
                    if (postResponse.imageUrls[0]) {
                        setImageUrl(postResponse.imageUrls[0]); // Set the image URL
                    }
                    setContent(postResponse.content || ''); // Set the textarea value
                }
            } catch (err) {
                setError(err); // Handle errors
            } finally {
                setLoading(false); // End loading state
            }
        };

        fetchData();
    }, [postId]); // Runs when `postId` changes

    // Loading and error states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message || 'Something went wrong.'}</p>;


    console.log('Post Data: ', postData);

    return (
        <Main>
            <Sidebar/>
            <Content>
                <h5>Post editing</h5>
                <form onSubmit={handleSubmit}>
                    <ImageUpload imgUrl={imageUrl} onUpload={handleImageUpload} />
                    <div className="mb">
                         <textarea
                             name="content"
                             value={content} // Controlled value
                             onChange={(e) => setContent(e.target.value)} // Update state on change
                             cols="30"
                             rows="10"
                             placeholder="post content"
                         ></textarea>
                    </div>
                    <Button ref={btnRef} type="submit" className="transition1">Edit Post</Button>
                </form>
            </Content>
        </Main>
    );
};

export default PostEdit;