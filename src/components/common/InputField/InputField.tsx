import React from 'react';
import { InputFieldProps } from '../../../types/types';

class InputField extends React.Component<
  React.PropsWithoutRef<InputFieldProps>,
  undefined
> {
  render() {
    return (
      <input
        type={'text'}
        value={this.props.searchValue}
        onInput={this.props.searchInputHandler}
        name={'input-field'}
      />
    );
  }
}

export default InputField;
