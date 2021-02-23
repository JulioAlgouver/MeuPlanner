import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
    type?: 'success' | 'error' | 'info';
    hasDescription: boolean;
}

const toastTypeVariations = {
    info: css`
        background: none;
        color: black;
    `, 
    success: css`
        background: #e6fffa;
        color: #2e656a;
    `,
    error: css`
        background: #fddede;
        color: #c53030;
    `, 
}

export const Container = styled(animated.div)<ContainerProps>`
    width:300px;
    position: absolute;
    padding 16px 20px 16px 16px;
    border-radius: 10px;
    box-shadow: 2px 2px 8px grey;

    position: relative;
    display: flex;
    z-index:2;

    font-size: 15px;

    & + div {
        margin-top: 8px;
    }

    ${(props) => toastTypeVariations [props.type || 'info']}

    button {
        position: absolute;
        right 8px;
        top: 8px;

        width: 20px;
        border-radius: 10px;
        border: none;
        background: none;

        margin-left: 80px;
        z-index:2;
    }

    button:hover {
        cursor:pointer;
    }

    button img {
        width: 20px;
    }

    ${props => !props.hasDescription && css `
        align-items: center;
    `}
`;