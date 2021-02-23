import React, {ButtonHTMLAttributes, HtmlHTMLAttributes} from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({children, ...rest}) => 
  <button type="button" {...rest}>
    {children}
  </button>

export default Button;