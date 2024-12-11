import React from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faPenToSquare,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";
import {useIsAdmin} from '../../../customHooks/useIsAdmin.js'


const Controls = styled.span`
    display: inline-flex;
    margin-left: 10px;
    flex-wrap: wrap;
    gap: 10px;`

const AwardMeta = ({awardId}) => {
    const canEdit = useIsAdmin();

    return (
        <p>
            {canEdit && <Controls>
                <Link to={`/award-edit/${awardId}`} title="Edit award">
                    <FontAwesomeIcon icon={faPenToSquare}/>
                </Link>
                <Link className="error" to={`/award-delete/${awardId}`} title="Delete award">
                    <FontAwesomeIcon icon={faTrash}/>
                </Link>
            </Controls>}
        </p>
    );
};

export default AwardMeta;