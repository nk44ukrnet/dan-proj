import React, { useState } from 'react';
import styled from "styled-components";
import Button from "../../../components/Button/Button.jsx";

const Wrapper = styled.div`
    display: flex;
    align-items: stretch;
    gap: 15px;
    margin-block: 20px;
`;
const ProgressBody = styled.div`
    border: 3px solid var(--border-color);
    flex: 1 1 100px;
    display: flex;
    position: relative;
`;
const AbsProgress = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`
const ProgressLine = styled.div`
    transition: all 0.25s linear;
    background-color: var(--border-color);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const SUCCESS_MSG = `Success!`;
const MAX_PROGRESS = 10;
const MIN_PROGRESS = 0;

const AwardProgress = ({ progressData = 0, onProgressChange }) => {
    const [progress, setProgress] = useState(progressData || 0);

    function handleIncrease() {
        setProgress(prev => {
            if (prev < MAX_PROGRESS) {
                const updatedProgress = prev + 1;
                onProgressChange(updatedProgress); // Notify parent
                return updatedProgress;
            } else {
                return prev;
            }
        });
    }

    function handleDecrease() {
        setProgress(prev => {
            if (prev > MIN_PROGRESS) {
                const updatedProgress = prev - 1;
                onProgressChange(updatedProgress); // Notify parent
                return updatedProgress;
            } else {
                return prev;
            }
        });
    }

    return (
        <>
            <p>Current Progress {progress} / {MAX_PROGRESS} :</p>
            <Wrapper>
                <Button onClick={handleDecrease}>-</Button>
                <ProgressBody>
                    <ProgressLine style={{ width: `${progress * 10}%` }}>

                         <AbsProgress>
                             {progress === MAX_PROGRESS && <>{SUCCESS_MSG}</>}
                             {progress < MAX_PROGRESS && <> {progress * 10}%</>}
                         </AbsProgress>
                    </ProgressLine>
                </ProgressBody>
                <Button onClick={handleIncrease}>+</Button>
            </Wrapper>
        </>
    );
};

export default AwardProgress;
