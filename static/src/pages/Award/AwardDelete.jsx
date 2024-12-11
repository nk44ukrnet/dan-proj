import React, {useEffect, useState} from 'react';
import {notLoggedIn} from "../../helpers/notLoggedIn.js";
import Sidebar from "../../compositions/Sidebar/Sidebar.jsx";
import Content from "../../containers/Content/Content.jsx";
import Main from "../../containers/Main/Main.jsx";
import {useParams} from "react-router-dom";
import {sendRequest} from "../../helpers/sendRequest.js";
import {API} from "../../config/API.js";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectorSession} from "../../store/selectors.js";
import {useIsAdmin} from "../../customHooks/useIsAdmin.js"

const AwardDelete = () => {
    notLoggedIn();
    const isAdmin = useIsAdmin();
    const {id: awardId} = useParams();

    const [error, setError] = useState(null); // State to handle any errors
    const [loading, setLoading] = useState(true); // State for loading indicator

    let selSession = useSelector(selectorSession);

    useEffect(() => {
        const fetchData = async () => {
            const headers = {
                Authorization: selSession.token,
            };
            try {
                // Fetch the post data
                const postResponse = await sendRequest(`${API}awards/${awardId}`, 'DELETE', {}, headers);
            } catch (err) {
                setError(err); // Handle errors
            } finally {
                setLoading(false); // End loading state
            }
        };

        fetchData();
    }, [awardId]);

    // Loading and error states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message || 'Something went wrong.'}</p>;

    return (
        <Main>
            <Sidebar/>
            <Content>
                <h3>Award has been successfully deleted.</h3>
                <p>Return to <Link to="/">home</Link>?</p>
            </Content>
        </Main>
    );
};

export default AwardDelete;