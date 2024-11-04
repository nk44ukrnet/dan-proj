import React from 'react';
import styled from 'styled-components';

const ButtonEl = styled.button`
    padding: 12px 24px;
    box-sizing: border-box;
    border-radius: var(--border-radius);
    border: none;
    background-color: var(--color1);
    color: #fff;

    &:hover {
        cursor: pointer;
    }
`;

// Use React.forwardRef to forward the ref to the button element
const Button = React.forwardRef(({ type = 'button', children, ...restProps }, ref) => {
    return (
        <ButtonEl type={type} ref={ref} {...restProps}>
            {children}
        </ButtonEl>
    );
});

export default Button;