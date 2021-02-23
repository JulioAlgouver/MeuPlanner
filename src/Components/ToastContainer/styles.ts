import styled, { css } from 'styled-components';

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

interface ToastProps {
    type?: 'success' | 'error' | 'info';
    hasDescription: boolean;
}

export const Container = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    padding: 25px;
    overflow: hidden;
    z-index:2;
`;

export const Toast = styled.div<ToastProps>`
    width:300px;
    position: absolute;
    padding 16px 20px 16px 16px;
    border-radius: 10px;
    box-shadow: 2px 2px 8px grey;
    z-index:2;

    position: relative;
    display: flex;

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