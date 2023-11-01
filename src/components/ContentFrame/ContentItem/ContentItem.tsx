import React, { type FC } from 'react';
import type { ContentItemProps } from '../../../types/types';
import './ContentItem.scss';

const ContentItem: FC<ContentItemProps> = (props) => {
  const { person } = props;

  return (
    <div className={'content-item__wrapper'}>
      <div className={'content-item__name'}>{person.name}</div>
      <div className={'content-item__description'}>{`Was born in ${
        person.birth_year || 'n/a'
      }, gender: ${person.gender || 'n/a'}`}</div>
    </div>
  );
};

export default ContentItem;
