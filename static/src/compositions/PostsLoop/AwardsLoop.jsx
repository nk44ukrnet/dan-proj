import React, { useEffect, useState } from 'react';
import { sendRequest } from "../../helpers/sendRequest.js";
import { API } from "../../config/API.js";
import { Link } from "react-router-dom";
import AwardMeta from "../../pages/Award/components/AwardMeta.jsx";
import {useIsAdmin} from "../../customHooks/useIsAdmin.js";

const AwardsLoop = () => {
    const [latestAwards, setLatestAwards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMessage, setLoadingMessage] = useState('Loading awards...');
    const isAdmin  = useIsAdmin();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await sendRequest(`${API}awards`, 'GET');

                // Directly set response if it's an array
                if (Array.isArray(response)) {
                    setLatestAwards(response);
                } else {
                    // Handle cases where the response might not be an array
                    const awards = response.awards || response.posts || [];
                    setLatestAwards(awards);
                }

                setLoading(false);
                setLoadingMessage('');
            } catch (error) {
                console.error('Error fetching awards:', error);
                setLoading(false);
                setLoadingMessage('Failed to load awards.');
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {loadingMessage && <p>{loadingMessage}</p>}
            {latestAwards.length > 0 ? (
                <ul className="posts-loop">
                    {latestAwards.map((award) => (
                        <li key={award._id}>
                            <Link className="post-image" to={`/award-view/${award._id}`}>
                                {award.imageUrls ? (
                                    <img src={award.imageUrls} alt="Award Image" loading="lazy" />
                                ) : (
                                    <span>View Award</span>
                                )}
                            </Link>
                            {isAdmin && <AwardMeta awardId={award._id}/> }
                            <div className="text-trim">{award.content || 'No description available'}</div>
                            <Link className="btn-type text-decoration-none" to={`/award-view/${award._id}`}>
                                Details
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                !loading && <p>No awards available.</p>
            )}
        </div>
    );
};

export default AwardsLoop;
