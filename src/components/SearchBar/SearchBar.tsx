import React from 'react';
import InputField from '../common/InputField/InputField';
import Button from '../common/Button/Button';
import ComponentWithError from '../common/ComponentWithError/ComponentWithError';
import type { SearchBarProps, SearchBarState } from '../../types/types';
import './SearchBar.scss';

class SearchBar extends React.Component<
  React.PropsWithoutRef<SearchBarProps>,
  SearchBarState
> {
  state: SearchBarState = {
    shouldErrorHappened: false,
  };

  render() {
    return (
      <div className={'search-bar__wrapper'}>
        <form
          className={'search-bar__form'}
          onSubmit={this.props.searchSubmitHandler}
        >
          <InputField
            searchValue={this.props.searchValue}
            searchInputHandler={this.props.searchInputHandler}
          />
          <Button title={'Search'} classType={'submit-button'} />
        </form>
        <Button
          title={'Throw an Error'}
          classType={'error-button'}
          clickHandler={() => {
            this.setState({ shouldErrorHappened: true });
          }}
        />
        {this.state.shouldErrorHappened && <ComponentWithError />}
      </div>
    );
  }
}

export default SearchBar;
