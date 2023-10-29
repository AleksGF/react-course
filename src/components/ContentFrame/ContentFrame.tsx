import React from 'react';
import ContentItem from './ContentItem/ContentItem';
import type { ContentFrameProps } from '../../types/types';
import './ContentFrame.scss';

class ContentFrame extends React.Component<
  React.PropsWithoutRef<ContentFrameProps>,
  undefined
> {
  render() {
    if (this.props.people.length === 0)
      return (
        <div className={'content-frame__wrapper'}>
          <h2>There are no persons to display</h2>
        </div>
      );

    return (
      <div className={'content-frame__wrapper'}>
        <h2 className={'content-frame__title'}>Star War Persons</h2>
        {this.props.people.map((person) => (
          <ContentItem
            key={`${person.name}-${person.url}-${person.created}`}
            person={person}
          />
        ))}
      </div>
    );
  }
}

export default ContentFrame;
