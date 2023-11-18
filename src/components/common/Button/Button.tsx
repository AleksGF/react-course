import React, { type FC } from 'react';
import './Button.scss';

type ButtonClassType = 'submit-button' | 'error-button';

interface ButtonProps {
  title: string;
  classType: ButtonClassType;
  clickHandler?: VoidFunction;
}

const Button: FC<ButtonProps> = (props) => {
  const { title, classType, clickHandler } = props;

  return (
    <button className={`button ${classType}`} onClick={clickHandler}>
      {title}
    </button>
  );
};

export default Button;
