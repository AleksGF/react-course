import React from 'react';

class ComponentWithError extends React.Component<undefined, undefined> {
  render() {
    throw new Error('Some error in rendering');

    return null;
  }
}

export default ComponentWithError;
