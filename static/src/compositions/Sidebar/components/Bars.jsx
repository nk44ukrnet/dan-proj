import React from 'react';
import styled from "styled-components";
import {MOBILE_SIZE} from "../../../variables/commonVariables.js";

const Bars = styled.button`
    position: fixed;
    top: 10px;
    right: 10px;
    cursor: pointer;
    background: none;
    color: var(--text-color);
    padding: 10px;
    border-radius: 50%;
    border: 1px solid var(--text-color);
    border-color: var(--text-color);
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: ${MOBILE_SIZE}px) {
        display: none;
    }
`



export default Bars;