import React, { type FC } from 'react';
import type { ButtonProps } from '@types/types';
import './Button.scss';

const Button: FC<ButtonProps> = (props) => {
  const { title, classType, clickHandler } = props;

  return (
    <button className={`button ${classType}`} onClick={clickHandler || null}>
      {title}
    </button>
  );
};

export default Button;
