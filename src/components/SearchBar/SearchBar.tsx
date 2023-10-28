import React from 'react';
import InputField from '../common/InputField/InputField';
import Button from '../common/Button/Button';
import type { SearchBarProps, SearchBarState } from '../../types/types';
import ComponentWithError from '../common/ComponentWithError/ComponentWithError';

class SearchBar extends React.Component<
  React.PropsWithoutRef<SearchBarProps>,
  SearchBarState
> {
  state: SearchBarState = {
    shouldErrorHappened: false,
  };

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
            this.setState({ shouldErrorHappened: true });
          }}
        />
        {this.state.shouldErrorHappened && <ComponentWithError />}
      </>
    );
  }
}

export default SearchBar;
