import React from 'react';
import styled from 'styled-components';
import cn from 'classnames';

const Label = styled.label`
    width: 100%;
    box-sizing: border-box;
`
const InputEl = styled.input`
    width: 100%;
    display: block;
    box-shadow: var(--shadow);
    border-radius: var(--border-radius);
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 20px;

    background-color: var(--input-background-color);
    color: var(--input-text-color);
    border: 1px solid var(--input-border-color);
    
    &::placeholder {
        color: var(--input-placeholder-color);
    }
    &:focus {
        border-color: var(--input-focus-border-color);
        outline: none; /* Remove default focus outline */
    }
    
    &.error {
        border-color: var(--error);
    }
    
`


const Input = (props) => {
    const {labelText, type = 'text', name, isError, className, errorMessage, ...restProps} = props;
    return (
        <Label>
            {labelText && <p>{labelText}</p>}
            <InputEl type={type} name={name} className={cn({className}, {'error': isError})} {...restProps} />
            {isError && errorMessage && <p className="error">{errorMessage}</p>}
        </Label>
    );
};

export default Input;