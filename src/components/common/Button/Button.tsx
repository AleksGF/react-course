import React from 'react';
import { ButtonProps } from '../../../types/types';

class Button extends React.Component<
  React.PropsWithoutRef<ButtonProps>,
  undefined
> {
  render() {
    return (
      <button
        className={`button ${this.props.classType}`}
        onClick={this.props.clickHandler ? this.props.clickHandler : null}
      >
        {this.props.title}
      </button>
    );
  }
}

export default Button;
