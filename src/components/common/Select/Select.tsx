import React, { FC } from 'react';
import type { SelectProps } from '@types/types';

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
        {options.map((optionValue) => {
          return (
            <option key={optionValue} value={optionValue}>
              {optionValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
