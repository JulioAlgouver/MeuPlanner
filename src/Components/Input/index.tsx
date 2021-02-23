import React, {InputHTMLAttributes, useCallback, useEffect, useRef, useState} from 'react';
import {useField} from '@unform/core';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input: React.FC<InputProps> = ({name, ...rest}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const {fieldName, defaultValue, error, registerField} = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName,registerField]);

  return (
    <Container isFocused={isFocused} isFilled={isFilled} isErrored={!!error}>
      <input 
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue} 
          ref={inputRef} 
          {...rest}
          />

        {error}
    </Container>
  );
};
  
export default Input;