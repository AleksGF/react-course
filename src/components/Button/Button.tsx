import React, { type FC } from 'react';

interface ButtonProps {
  title: string;
}

const Button: FC<ButtonProps> = ({ title }) => {
  return <button data-testid={'searchButton'}>{title}</button>;
};

export default Button;
