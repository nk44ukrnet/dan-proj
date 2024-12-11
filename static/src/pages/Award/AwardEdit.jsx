import React, {useRef, useState, useEffect} from 'react';
import {notLoggedIn} from "../../helpers/notLoggedIn.js";
import {useIsCurrentUserOrAdmin} from '../../customHooks/useIsCurrentUserOrAdmin.js'
import {useSelector} from "react-redux";
import {selectorSession, selectorUser} from "../../store/selectors.js";
import Sidebar from "../../compositions/Sidebar/Sidebar.jsx";
import Content from "../../containers/Content/Content.jsx";
import Main from "../../containers/Main/Main.jsx";
import {useNavigate, useParams, Link} from 'react-router-dom';
import ImageUpload from "../../components/ImageUpload/ImageUpload.jsx";
import Button from "../../components/Button/Button.jsx";
import {sendRequest} from "../../helpers/sendRequest.js";
import {API} from "../../config/API.js";
import {useIsAdmin} from '../../customHooks/useIsAdmin.js'

const AwardEdit = () => {
    notLoggedIn();
    const isAdmin = useIsAdmin();
    const {id: postId} = useParams();
    const selUser = useSelector(selectorUser);
    let selSession = useSelector(selectorSession);
    const canEdit = useIsCurrentUserOrAdmin(selUser._id);
    const navigate = useNavigate();
    const textAreaRef = useRef();
    const btnRef = useRef();

    const [imageUrl, setImageUrl] = useState(''); // State to store image URL
    const [content, setContent] = useState(''); // State for textarea value
    const [error, setError] = useState(null); // State to handle any errors
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [postData, setPostData] = useState(null); // Request post data

    async function handleSubmit(e) {
        e.preventDefault();

        const headers = {
            Authorization: selSession.token,
            user: selUser._id,
        };

        const body = {
            content: content,
            imageUrls: imageUrl ? [imageUrl] : []
        };

        try {
            const data = await sendRequest(`${API}awards/${postId}`, 'PUT', {body: JSON.stringify(body)}, headers);
            console.log("Award Edited successfully!", data);
            navigate(`/award-view/${postId}`);
        } catch (error) {
            console.error("Error editing award:", error);
        }
    }

    const handleImageUpload = (url) => {
        setImageUrl(url); // Update state with the uploaded image URL
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the post data
                const postResponse = await sendRequest(`${API}awards/${postId}`, 'GET');
                setPostData(postResponse);

                // Update the textarea and image URL only if data exists
                if (postResponse) {
                    if (postResponse.imageUrls) {
                        setImageUrl(postResponse.imageUrls); // Set the image URL
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


    return (
        <Main>
            <Sidebar/>
            <Content>
                <h5>Award editing</h5>
                <form onSubmit={handleSubmit}>
                    <ImageUpload imgUrl={imageUrl} onUpload={handleImageUpload}/>
                    <div className="mb">
                         <textarea
                             name="content"
                             value={content} // Controlled value
                             onChange={(e) => setContent(e.target.value)} // Update state on change
                             cols="30"
                             rows="10"
                             placeholder="award content"
                         ></textarea>
                    </div>
                    <div className="casual-flex">
                        <Button ref={btnRef} type="submit" className="transition1">Edit Award</Button>
                        <Link to={`/award-view/${postId}`} className="btn-type transition1 without-text-decoration">Cancel</Link>
                    </div>
                </form>
            </Content>
        </Main>
    );
};

export default AwardEdit;