import React from 'react';
import styled from 'styled-components';
import {MOBILE_SIZE} from "../../variables/commonVariables.js";

const Main = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    position: relative;
    min-height: 100vh;
    background-color: var(--secondary-background-color);
    
    @media (max-width: ${MOBILE_SIZE}) {
        gap: 20px;
    }
`

export default Main;