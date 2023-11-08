import React, { type FC, type FormEventHandler } from 'react';

export interface InputFieldProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const InputField: FC<InputFieldProps> = (props) => {
  const { value, setValue } = props;

  const searchInputHandler: FormEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target as HTMLInputElement;
    setValue(value.trimStart());
  };

  return (
    <input
      type={'text'}
      value={value}
      onInput={searchInputHandler}
      name={'input-field'}
    />
  );
};

export default InputField;
