import React, { useEffect, useState } from 'react';
import { sendRequest } from "../../helpers/sendRequest.js";
import { API } from "../../config/API.js";
import { Link } from "react-router-dom";
import PostsMeta from "../../pages/Post/components/PostMeta.jsx";
import Button from "../../components/Button/Button.jsx";

const PostsLoop = () => {
    const [latestPosts, setLatestPosts] = useState([]);
    const [perPage, setPerPage] = useState(8);
    const [startPage, setStartPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [loadingMessage, setLoadingMessage] = useState('Loading posts...');
    const [postQuantity, setPostQuantity] = useState(0);
    const [postShown, setPostShown] = useState(0);

    useEffect(() => {
        setLoadingMessage('');
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch the post data
                const postsResponse = await sendRequest(`${API}posts?perPage=${perPage}&startPage=${startPage}`, 'GET');

                // Update state with the response
                const posts = postsResponse.posts || [];
                setLatestPosts(posts);
                setPostQuantity(postsResponse.postsQuantity || 0);

                // Calculate the new postShown value
                const postsFetched = (startPage - 1) * perPage + posts.length;
                setPostShown(postsFetched);

                setLoading(false);
                setLoadingMessage('');
            } catch (err) {
                console.error(err);
                setLoading(false);
                setLoadingMessage('Failed to load posts.');
            }
        };

        fetchData();
    }, [startPage]);

    function handlePrev() {
        if (startPage > 1) {
            setStartPage((prev) => prev - 1);
        }
    }

    function handleNext() {
        if (postShown < postQuantity) {
            setStartPage((prev) => prev + 1);
        }
    }

    return (
        <div>
            {loadingMessage && <p>{loadingMessage}</p>}
            {latestPosts.length > 0 ? (
                <ul className="posts-loop">
                    {latestPosts.map((post) => (
                        <li key={post._id}>
                            <Link className="post-image" to={`/post-view/${post._id}`}>
                                {post.imageUrls[0] && <img src={post.imageUrls[0]} alt="Post Image" loading="lazy" />}
                                {!post.imageUrls[0] && <span>View Post</span>}
                            </Link>
                            <PostsMeta
                                userId={post.user?._id || post.user}
                                date={post.date}
                                postId={post._id}
                                likes={post.likes}
                                userFirstName={post.user?.firstName || "Unknown"}
                            />
                            <div className="text-trim">{post.content}</div>
                            <Link className="btn-link-v1 text-decoration-none" to={`/post-view/${post._id}`}>
                                Read More
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                !loading && <p>No posts available.</p>
            )}
            <div className="common-flex">
                {startPage > 1 && <Button onClick={handlePrev}>Previous Page</Button>}
                {postShown < postQuantity && <Button onClick={handleNext}>Next Page</Button>}
            </div>
        </div>
    );
};

export default PostsLoop;
