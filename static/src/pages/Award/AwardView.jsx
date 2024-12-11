import React, {useEffect, useState} from 'react';
import {notLoggedIn} from "../../helpers/notLoggedIn.js";
import Sidebar from "../../compositions/Sidebar/Sidebar.jsx";
import Content from "../../containers/Content/Content.jsx";
import Main from "../../containers/Main/Main.jsx";
import {useParams} from 'react-router-dom';
import {sendRequest} from "../../helpers/sendRequest.js";
import {API} from "../../config/API.js";
import {Link} from "react-router-dom";
import AwardMeta from './components/AwardMeta.jsx';
import {useIsAdmin} from "../../customHooks/useIsAdmin.js";
import Button from "../../components/Button/Button.jsx";
import {selectorUser, selectorSession} from "../../store/selectors.js";
import {useSelector} from "react-redux";

const AwardView = () => {
    notLoggedIn();
    const {id: awardId} = useParams();
    const [awardData, setAwardData] = useState(null); // State to store the first request data
    const [error, setError] = useState(null); // State to handle any errors
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [userHasCurrentAward, setUserHasCurrentAward] = useState(false);
    const isAdmin = useIsAdmin();
    const selUser = useSelector(selectorUser);
    const selSession = useSelector(selectorSession);


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the award data
                const postResponse = await sendRequest(`${API}awards/${awardId}`, 'GET');
                setAwardData(postResponse);
            } catch (err) {
                setError(err); // Handle errors
            } finally {
                setLoading(false); // End loading state
            }
        };

        fetchData();
    }, [awardId]); // Runs when `awardId` changes

    // Loading and error states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message || 'Something went wrong.'}</p>;

    return (
        <Main>
            <Sidebar/>
            <Content>
                {awardData.imageUrls && <img src={awardData.imageUrls} className="img-long"/>}
                {isAdmin && <AwardMeta awardId={awardId}/>}
                <h5>
                    {awardData.content}
                </h5>
            </Content>

        </Main>
    );
};

export default AwardView;