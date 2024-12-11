import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import cn from "classnames";
import {
    faPenToSquare,
    faTrash,
    faHeart,
} from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";
import {useIsCurrentUserOrAdmin} from '../../../customHooks/useIsCurrentUserOrAdmin.js'
import {useIsAdmin} from '../../../customHooks/useIsAdmin.js'
import {sendRequest} from "../../../helpers/sendRequest.js";
import {API} from "../../../config/API.js";
import {useSelector} from "react-redux";
import {selectorSession, selectorUser} from "../../../store/selectors.js";

const Controls = styled.span`
    display: inline-flex;
    margin-left: 10px;
    flex-wrap: wrap;
    gap: 10px;`

const PostMeta = ({userFirstName = 'author', userId, postId, date, likes}) => {
    const canEdit = useIsCurrentUserOrAdmin(userId);
    const canDelete = useIsAdmin();
    let formattedDate = new Date(date).toLocaleDateString();
    const [isFavorite, setIsFavorite] = useState(false);
    const [currentFavorites, setCurrentFavorites] = useState(likes || []);
    const selUser = useSelector(selectorUser);
    let selSession = useSelector(selectorSession);

    // Check if current user has liked the post
    useEffect(() => {
        if (currentFavorites.includes(selUser._id)) {
            setIsFavorite(true);
        } else {
            setIsFavorite(false);
        }
    }, [currentFavorites, selUser._id]);

    function handleFavorite() {
        // Toggle the favorite status
        setIsFavorite(!isFavorite);

        // Prepare the updated list of likes
        let updatedLikes = [...currentFavorites];
        if (isFavorite) {
            updatedLikes = updatedLikes.filter(userId => userId !== selUser._id);  // Remove user's like
        } else {
            updatedLikes.push(selUser._id);  // Add user's like
        }

        setCurrentFavorites(updatedLikes);  // Update the local state immediately

        const headers = {
            Authorization: selSession.token,
            user: selUser._id,
            'Content-Type': 'application/json'
        };

        const body = { likes: updatedLikes };  // Send the updated likes list to the server

        // Send the request to update the likes on the server
        try {
            sendRequest(`${API}posts/${postId}`, 'PATCH', JSON.stringify(body), headers)
                .then(res => console.log(res)) // Optionally handle the response
                .catch(err => console.log(err)); // Handle errors
        } catch (err) {
            console.log(err);
        }
    }



    return (
        <p>
            <span className="casual-flex-inline">
                <span>
                    By <Link to={`/user-view/${userId}`}>{userFirstName}</Link> on {formattedDate}
                </span>
                <span className="casual-flex-inline">
                    <FontAwesomeIcon
                        icon={faHeart}
                        className={cn(`pointer`, {'error': isFavorite})}
                        onClick={handleFavorite}
                    /> {currentFavorites.length}
                </span>
            </span>
            {canEdit && <Controls>
                |
                <Link to={`/post-edit/${postId}`} title="Edit post">
                    <FontAwesomeIcon icon={faPenToSquare}/>
                </Link>
                <Link className="error" to={`/post-delete/${postId}`} title="Delete post">
                    <FontAwesomeIcon icon={faTrash}/>
                </Link>
            </Controls>}
        </p>
    );
};

export default PostMeta;