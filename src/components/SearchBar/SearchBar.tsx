import React from 'react';
import InputField from '../common/InputField/InputField';
import Button from '../common/Button/Button';

class SearchBar extends React.Component<undefined, undefined> {
  render() {
    return (
      <>
        <InputField />
        <Button />
        <Button />
      </>
    );
  }
}

export default SearchBar;
