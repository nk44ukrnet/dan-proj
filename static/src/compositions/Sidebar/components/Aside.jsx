import React from 'react';
import styled from 'styled-components';
import {MOBILE_SIZE} from "../../../variables/commonVariables.js";

const Aside = styled.aside`
    padding: 20px;
    width: 100%;
    max-width: 200px;
    position: relative;
    background-color: var(--background-color);
    
    .bars {
        display: none;
    }

    @media (max-width: ${MOBILE_SIZE}px) {
        //display: none;
        position: fixed;
        z-index: 5;
        height: 100%;
        overflow-y: auto;
        transition: var(--transition);
        
        &:not(.active) {
            transform: translateX(-110%);
        }
    }

    ul {
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-block: 25px 25px;
        box-sizing: border-box;
        //height: 100%;
    }

    li {
        width: fit-content;
        color: var(--text-color);

        svg {
            color: var(--color1);
        }
    }

    a {
        text-decoration: none;
        color: var(--text-color);
    }

    .times {
        position: absolute;
        top: 10px;
        right: 10px;

        @media (min-width: ${MOBILE_SIZE}px) {
            display: none;
        }
    }



`

export default Aside;