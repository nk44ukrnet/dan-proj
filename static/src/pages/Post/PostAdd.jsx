import React, {useRef, useState} from 'react';
import Sidebar from "../../compositions/Sidebar/Sidebar.jsx";
import Content from "../../containers/Content/Content.jsx";
import Main from "../../containers/Main/Main.jsx";
import {sendRequest} from "../../helpers/sendRequest.js";
import {API} from "../../config/API.js";
import {useSelector} from "react-redux";
import {selectorSession} from "../../store/selectors.js";
import ImageUpload from "../../components/ImageUpload/ImageUpload.jsx";
import Button from '../../components/Button/Button.jsx'
import {notLoggedIn} from "../../helpers/notLoggedIn.js";

const PostAdd = () => {
    notLoggedIn();
    const textAreaRef = useRef();
    const btnRef = useRef();
    let selSession = useSelector(selectorSession);
    const [imageUrl, setImageUrl] = useState(null); // State to store image URL

    const handleImageUpload = (url) => {
        setImageUrl(url); // Update state with the uploaded image URL
    };
    async function handleSubmit(e) {
        e.preventDefault();
        console.log(textAreaRef.current.value)
        const headers = {
            Authorization: selSession.token,
        };
        const body = JSON.stringify({
            content: textAreaRef.current.value,
            imageUrls: imageUrl || '',
        });

        try {
            await sendRequest(`${API}posts`, 'POST', {body}, headers)
                .then()
                .catch((err) => {})
                .finally(() => {  });
            console.log("Post created successfully!");
        } catch (error) {
            console.error("Error creating post:", error);
        }
    }


    return (
        <Main>
            <Sidebar/>
            <Content>
                <h5>Add Post</h5>

                <form onSubmit={handleSubmit}>
                    <ImageUpload onUpload={handleImageUpload} />
                    <div className="mb">
                        <textarea name="content" ref={textAreaRef} cols="30" rows="10"
                                  placeholder="post content"></textarea>
                    </div>
                    <Button ref={btnRef} type="submit" className="transition1">Publish</Button>
                </form>
            </Content>
        </Main>
    );
};

export default PostAdd;