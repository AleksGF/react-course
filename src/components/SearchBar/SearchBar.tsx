import React from 'react';
import InputField from '../common/InputField/InputField';
import Button from '../common/Button/Button';
import { SearchBarProps } from '../../types/types';

class SearchBar extends React.Component<
  React.PropsWithoutRef<SearchBarProps>,
  undefined
> {
  render() {
    return (
      <>
        <form onSubmit={this.props.searchSubmitHandler}>
          <InputField
            searchValue={this.props.searchValue}
            searchInputHandler={this.props.searchInputHandler}
          />
          <Button title={'Search'} classType={'SubmitButton'} />
        </form>
        <Button
          title={'Throw an Error'}
          classType={'ErrorButton'}
          clickHandler={() => {
            throw new Error('Error: error was generated');
          }}
        />
      </>
    );
  }
}

export default SearchBar;
