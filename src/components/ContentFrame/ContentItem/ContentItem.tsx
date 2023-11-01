import React from 'react';
import type { ContentItemProps } from '../../../types/types';
import './ContentItem.scss';

class ContentItem extends React.Component<
  React.PropsWithoutRef<ContentItemProps>,
  undefined
> {
  render() {
    return (
      <div className={'content-item__wrapper'}>
        <div className={'content-item__name'}>{this.props.person.name}</div>
        <div className={'content-item__description'}>{`Was born in ${
          this.props.person.birth_year || 'n/a'
        }, gender: ${this.props.person.gender || 'n/a'}`}</div>
      </div>
    );
  }
}

export default ContentItem;
