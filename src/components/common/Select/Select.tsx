import React, { type ChangeEvent, type FC } from 'react';

interface SelectProps {
  wrapperClassName: string;
  title: string;
  selectName: string;
  defaultValue: number | string;
  changeHandler: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: number[] | string[];
}

const Select: FC<SelectProps> = (props) => {
  const {
    wrapperClassName,
    title,
    selectName,
    defaultValue,
    changeHandler,
    options,
  } = props;

  return (
    <div className={wrapperClassName}>
      <div>{title}</div>
      <select
        name={selectName}
        defaultValue={defaultValue}
        onChange={changeHandler}
      >
        {options.map((optionValue) => (
          <option key={optionValue} value={optionValue}>
            {optionValue}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
