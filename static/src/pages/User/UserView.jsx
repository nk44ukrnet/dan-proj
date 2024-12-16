import React, {useEffect, useMemo, useState} from 'react';
import {notLoggedIn} from "../../helpers/notLoggedIn.js";
import Sidebar from "../../compositions/Sidebar/Sidebar.jsx";
import Content from "../../containers/Content/Content.jsx";
import Main from "../../containers/Main/Main.jsx";
import {useParams} from "react-router-dom";
import {sendRequest} from "../../helpers/sendRequest.js";
import {API} from "../../config/API.js";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faUserPen,
} from '@fortawesome/free-solid-svg-icons';
import {useSelector} from "react-redux";
import {selectorUser} from "../../store/selectors.js";
import {useIsCurrentUser} from "../../customHooks/useIsCurrentUser.js";

const UserView = () => {
    notLoggedIn();
    const {id: userID} = useParams();
    const [userData, setUserData] = useState(null); // State to store the first request data
    const [error, setError] = useState(null); // State to handle any errors
    const [loading, setLoading] = useState(true); // State for loading indicator
    const selUser = useSelector(selectorUser);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the post data
                const userResponse = await sendRequest(`${API}users/${userID}`, 'GET');
                setUserData(userResponse);
                console.log(userResponse)

            } catch (err) {
                setError(err); // Handle errors
            } finally {
                setLoading(false); // End loading state
            }
        };

        fetchData();
    }, [userID]); // Runs when `userID` changes

    const userMetaData = useMemo(() => {
        if (!userData) return null;
        return {
            // userFirstName: userData.user.firstName,
            // userId: userData.user._id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            avatar: userData?.avatar || '',
        };
    }, [userData, userID]);

    // Use the hook directly for `canEdit`
    const canEdit = useIsCurrentUser(userID);

    // Loading and error states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message || 'Something went wrong.'}</p>;

    return (
        <Main>
            <Sidebar/>
            <Content>
                <h5>User Info</h5>
                {userMetaData.avatar && <>
                    <img src={userMetaData.avatar} alt="avatar" className="avatar" loading="lazy"/>
                </>}
                <p>First Name:</p>
                <p><strong>{userMetaData.firstName}</strong></p>
                <p>Last Name:</p>
                <p><strong>{userMetaData.lastName}</strong></p>
                {canEdit && <p><Link className="text-decoration-none" to={`/user-edit/${userID}`}><FontAwesomeIcon icon={faUserPen} /> Edit User</Link></p>}
            </Content>
        </Main>
    );
};

export default UserView;