import React, { type FC, type FormEventHandler } from 'react';
import type { InputFieldProps } from '../../../types/types';

const InputField: FC<InputFieldProps> = (props) => {
  const { searchValue, setSearchValue } = props;

  const searchInputHandler: FormEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target as HTMLInputElement;
    setSearchValue(value.trimStart());
  };

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
