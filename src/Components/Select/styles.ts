import styled, { css } from "styled-components";

interface SelectProps{
    isErrored: boolean;
}

export const Container = styled.div<SelectProps>`

    position: relative;
    display: grid;
    justify-content: space-arround;
    width: 100px;
    height: 5px;
    line-height: 10px;
    font-size: 12px;

    ${(props) =>
        props.isErrored && 
        css`
            background: rgb(192, 29, 35, 0.30);
            border-color: '#c53030';
            color: red;
        `}
`

