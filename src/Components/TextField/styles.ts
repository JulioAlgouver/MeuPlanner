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
            border-radius: 15px;
            justify-content:center;
            align-items: center;
            
            margin-Top: 15px;
            padding-Top: 0;
            background: #c53010;
            height: 150px;
        `}
    `