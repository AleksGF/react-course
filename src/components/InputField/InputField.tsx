import React, { type FC } from 'react';

export interface InputFieldProps {
  defaultValue: string;
}

const InputField: FC<InputFieldProps> = (props) => {
  return (
    <input
      type={'text'}
      name={'inputField'}
      data-testid={'searchInput'}
      {...props}
    />
  );
};

export default InputField;
