import React from 'react';
import styled from 'styled-components';
import {MOBILE_SIZE} from "../../../variables/commonVariables.js";

const Overlay = styled.div`
     @media (min-width: ${MOBILE_SIZE}px) {
         display: none;
     }
    @media (max-width: ${MOBILE_SIZE}px) {
        position: fixed;
        width: 100%;
        height: 100%;
        display: block;
        top: 0;
        left: 0;
        backdrop-filter: blur(10px);
        z-index: 2;
    }
`

export default Overlay;