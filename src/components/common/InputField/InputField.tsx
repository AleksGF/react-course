import React, { type FC } from 'react';
import type { InputFieldProps } from '../../../types/types';

const InputField: FC<InputFieldProps> = (props) => {
  const { searchValue, searchInputHandler } = props;

  return (
    <input
      type={'text'}
      value={searchValue}
      onInput={searchInputHandler}
      name={'input-field'}
    />
  );
};

export default InputField;
