import styled ,{ css } from "styled-components";

interface ContainerProps {
    isFocused: boolean;
    isFilled: boolean;
    isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
    padding-Top: 5px;
    border-radius: 10px;
    
    display:flex;
    justify-content:center;
    align-items: center;

    ${(props) =>
        props.isErrored && 
        css`
            display:flex;
            margin-Top: 10px;
            padding-Top: 1px;
            justify-content:center;
            align-items: center;
            border: #c53010;
            background: #c53010;
            height: 28px;
        `}
        
    `