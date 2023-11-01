import React, { type FC } from 'react';
import ContentItem from './ContentItem/ContentItem';
import type { ContentFrameProps } from '../../types/types';
import './ContentFrame.scss';

const ContentFrame: FC<ContentFrameProps> = (props) => {
  const { people } = props;

  return (
    <div className={'content-frame__wrapper'}>
      <h2 className={'content-frame__title'}>Star War Persons</h2>
      {people.map((person) => (
        <ContentItem
          key={`${person.name}-${person.url}-${person.created}`}
          person={person}
        />
      ))}
    </div>
  );
};

export default ContentFrame;
