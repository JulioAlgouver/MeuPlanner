import React, { useEffect } from 'react';
import {ToastMessage, useToast} from '../../../Hooks/ToastContext';
import {Container} from './styles';

import closeButton from '../../../Images/close_icon.png';


interface ToastProps {
    message:ToastMessage;
    style:object;
}

const Toast: React.FC<ToastProps> = ({message, style}) => {
    const {removeToast} = useToast();

    useEffect(() => {
        const timer = setTimeout(() => {
            removeToast(message.id);
        }, 3000);

        return () => {
            clearTimeout(timer);
        }
    },[message.id, removeToast])

    return (
        <Container type={message.type} hasDescription={!!message.description} style={style}>
            <div>
                <strong>{message.title}</strong>
                <span>{message.description && <p>{message.description}</p>}</span>
            </div>

            <button type='button' onClick={() => removeToast(message.id)}>
                    <img src={closeButton}/>
            </button>
        </Container>
    );
};

export default Toast;