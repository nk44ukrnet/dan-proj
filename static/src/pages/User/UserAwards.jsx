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

const UserView = ({awards}) => {
    const selUser = useSelector(selectorUser);

    // Loading and error states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message || 'Something went wrong.'}</p>;

    return (
        <>

        </>
    );
};

export default UserView;