import React, { useEffect, useState } from 'react';
import { notLoggedIn } from "../../helpers/notLoggedIn.js";
import Sidebar from "../../compositions/Sidebar/Sidebar.jsx";
import Content from "../../containers/Content/Content.jsx";
import Main from "../../containers/Main/Main.jsx";
import { useParams } from 'react-router-dom';
import { sendRequest } from "../../helpers/sendRequest.js";
import { API } from "../../config/API.js";
import AwardMeta from './components/AwardMeta.jsx';
import { useIsAdmin } from "../../customHooks/useIsAdmin.js";
import { selectorUser, selectorSession } from "../../store/selectors.js";
import { useDispatch, useSelector } from "react-redux";
import AwardProgress from "./components/AwardProgress.jsx";
import { setUser } from "../../store/index.js";


const AwardView = () => {
    notLoggedIn();
    const { id: awardId } = useParams();
    const [awardData, setAwardData] = useState(null); // State to store the first request data
    const [error, setError] = useState(null); // State to handle any errors
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [userHasCurrentAward, setUserHasCurrentAward] = useState(false);
    const isAdmin = useIsAdmin();
    const selUser = useSelector(selectorUser);
    const selSession = useSelector(selectorSession);
    const [currentProgress, setCurrentProgress] = useState(0);
    const dispatch = useDispatch();
    const [currentAwardId, setCurrentAwardId] = useState(null);

    const headers = {
        Authorization: selSession.token,
    };

    const [userData, setUserData] = useState(null); // State to store the first request data

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the award data
                const postResponse = await sendRequest(`${API}awards/${awardId}`, 'GET');
                setAwardData(postResponse);

                const userResponse = await sendRequest(`${API}users/${selUser._id}`, 'GET');
                setUserData(userResponse);

                // Determine the current progress
                const progress = userResponse?.[awardId] || 0;
                console.log('progress ', progress);
                setCurrentProgress(progress);
            } catch (err) {
                setError(err); // Handle errors
            } finally {
                setLoading(false); // End loading state
            }
        };

        fetchData();
    }, [awardId, selUser._id]); // Runs when `awardId` or `selUser._id` changes

    // Callback to update progress
    async function updateProgress(newProgress) {
        setCurrentProgress(newProgress);
        handleChallenge(newProgress);
    }

    async function handleChallenge(newProgress) {
        try {
            const response = await sendRequest(
                `${API}users`,
                'PUT',
                {
                    body: JSON.stringify({
                        [awardId]: newProgress, // Use dynamic property syntax to target the specific award
                    }),
                },
                headers
            );

            console.log('Changes successfully saved');
            dispatch(setUser(response)); // Update the Redux store with the new user data
            setUserHasCurrentAward(true);
        } catch (err) {
            console.error('Error while saving user. Try different values for one of the inputs:', err);
        }
    }

    // Loading and error states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message || 'Something went wrong.'}</p>;

    return (
        <Main>
            <Sidebar />
            <Content>
                {awardData.imageUrls && <img src={awardData.imageUrls} className="img-long" />}
                {isAdmin && <AwardMeta awardId={awardId} />}
                <h5>
                    {awardData.content}
                </h5>
                {awardData?.desc && <p>{awardData.desc}</p>}
                <AwardProgress
                    progressData={currentProgress}
                    onProgressChange={updateProgress}
                />
            </Content>

        </Main>
    );
};

export default AwardView;
