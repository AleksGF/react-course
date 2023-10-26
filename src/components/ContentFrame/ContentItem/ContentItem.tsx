import React from 'react';
import type { ContentItemProps } from '../../../types/types';

class ContentItem extends React.Component<
  React.PropsWithoutRef<ContentItemProps>,
  undefined
> {
  render() {
    return (
      <>
        <div>{this.props.person.name}</div>
        <div>{`Was born in ${this.props.person.birth_year || 'n/a'}, gender: ${
          this.props.person.gender || 'n/a'
        }`}</div>
      </>
    );
  }
}

export default ContentItem;
