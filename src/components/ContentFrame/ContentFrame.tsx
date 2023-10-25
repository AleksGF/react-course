import React from 'react';
import ContentItem from './ContentItem/ContentItem';

class ContentFrame extends React.Component<undefined, undefined> {
  render() {
    return (
      <div>
        <ContentItem />
        <ContentItem />
        <ContentItem />
      </div>
    );
  }
}

export default ContentFrame;
