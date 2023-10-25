import React from 'react';

class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  undefined
> {
  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
