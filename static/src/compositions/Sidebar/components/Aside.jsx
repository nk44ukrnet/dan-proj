import React from 'react';
import styled from 'styled-components';
import {MOBILE_SIZE} from "../../../variables/commonVariables.js";

const Aside = styled.aside`
    padding: 20px;
    width: 100%;
    max-width: 170px;
    position: relative;

    ul {
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-block: 25px;
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