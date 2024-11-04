import React from 'react';
import styled from 'styled-components';
import {MOBILE_SIZE} from "../../../variables/commonVariables.js";

const Frame = styled.div`
    width: 100%;
    max-width: 35vw;

    @media (max-width: ${MOBILE_SIZE}px) {
        max-width: 600px;
    }
`

export default Frame;