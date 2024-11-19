import React from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faPenToSquare,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";
import {useIsCurrentUserOrAdmin} from  '../../../customHooks/useIsCurrentUserOrAdmin.js'
import {useIsAdmin} from  '../../../customHooks/useIsAdmin.js'

const Controls = styled.span`
    display: inline-flex;
    margin-left: 10px;
    flex-wrap: wrap;
    gap: 10px;`

const PostMeta = ({userFirstName, userId, postId, date}) => {
    const canEdit = useIsCurrentUserOrAdmin(userId);
    const canDelete = useIsAdmin();
    let formattedDate = new Date(date).toLocaleDateString();
    return (
        <p>
            By <Link to={`/user-view/${userId}`}>{userFirstName}</Link> on {formattedDate}
            {canEdit && <Controls>
                |
                <Link to={`/post-edit/${postId}`} title="Edit post">
                    <FontAwesomeIcon icon={faPenToSquare}/>
                </Link>
                {canDelete && <Link className="error" to={`/post-delete/${postId}`} title="Delete post">
                    <FontAwesomeIcon icon={faTrash}/>
                </Link>}
            </Controls>}
        </p>
    );
};

export default PostMeta;