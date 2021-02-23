import React, {TextareaHTMLAttributes, useCallback, useEffect, useRef, useState} from 'react';
import {useField} from '@unform/core';
import { Container} from './styles';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
}

const TextArea: React.FC<TextAreaProps> = ({name, ...rest}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const {fieldName, defaultValue, error, registerField} = useField(name);

  const handleTextAreaFocus = useCallback(() => {
    setIsFocused(true);
  }, [])

  const handleTextAreaBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!textAreaRef.current?.value);
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textAreaRef.current,
      path: 'value',
    })
  }, [fieldName,registerField]);

  return (
    <Container isFocused={isFocused} isFilled={isFilled} isErrored={!!error}>
      <textarea 
          onFocus={handleTextAreaFocus}
          onBlur={handleTextAreaBlur}
          defaultValue={defaultValue} 
          ref={textAreaRef} 
          {...rest}
          />

        {error}
    </Container>
  );
};
  
export default TextArea;