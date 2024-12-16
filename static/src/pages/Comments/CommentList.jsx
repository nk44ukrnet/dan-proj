import React, {useState, useEffect} from 'react';
import {sendRequest} from "../../helpers/sendRequest.js";
import {API} from "../../config/API.js";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faPenToSquare,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {useIsCurrentUser} from "../../customHooks/useIsCurrentUser.js";
import {selectorUser} from "../../store/selectors.js";
import {useSelector} from "react-redux";


const CommentList = ({postId}) => {
    const [comments, setComments] = useState([]);
    const selUser = useSelector(selectorUser);

    const currentUserId = selUser._id;


    useEffect(() => {
        async function fetchComments() {
            try {
                const response = await sendRequest(`${API}comments/post/${postId}`, 'GET')
                setComments(response);
            } catch (e) {
                console.log(e);
            }
        }

        fetchComments();
    }, [])


    return (
        <>
            {comments.length > 0 && <div className="mt">
                {comments.map((comment) => {
                    console.log(comment)
                    // const canEdit = useIsCurrentUser(`${comment.user._id}`);
                    return <div key={comment._id} className="mt">
                        <p>By <Link to={`/user-view/${comment.user._id}`}>{comment.user.firstName}</Link>
                            {currentUserId === comment.user._id && <span className="casual-flex-inline">&nbsp;
                                <Link to={`/comment-edit/${comment._id}`} title="Edit post">
                    <FontAwesomeIcon icon={faPenToSquare}/>
                </Link>
                <Link className="error" to={`/comment-delete/${comment._id}`} title="Delete post">
                    <FontAwesomeIcon icon={faTrash}/>
                </Link>

                            </span>}
                        </p>
                        <p>{comment.content}</p>
                        <hr/>
                    </div>

                })}

            </div>}
        </>
    );
};

export default CommentList;