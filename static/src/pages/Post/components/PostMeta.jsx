import React from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faPenToSquare,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";
import {isCurrentUserOrAdmin} from "../../../helpers/isCurrentUserOrAdmin.js";

const Controls = styled.span`
    display: inline-flex;
    margin-left: 10px;
    flex-wrap: wrap;
    gap: 10px;`

const PostMeta = ({userFirstName, userId, postId, date, currentUser, isAdmin}) => {
    let formattedDate = new Date(date).toLocaleDateString();
    return (
        <p>
            By <Link to={`/user-view/${userId}`}>{userFirstName}</Link> on {formattedDate}
            {/*{currentUser || isAdmin && <Controls>*/}
            {/*    |*/}
            {/*    <Link to={`/post-edit/${postId}`} title="Edit post">*/}
            {/*        <FontAwesomeIcon icon={faPenToSquare}/>*/}
            {/*    </Link>*/}
            {/*    <Link className="error" to={`/post-delete/${postId}`} title="Delete post">*/}
            {/*        <FontAwesomeIcon icon={faTrash}/>*/}
            {/*    </Link>*/}
            {/*</Controls>}*/}
        </p>
    );
};

export default PostMeta;