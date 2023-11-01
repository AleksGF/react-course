import React from 'react';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SearchBar from './components/SearchBar/SearchBar';
import ContentFrame from './components/ContentFrame/ContentFrame';
import Loader from './components/common/Loader/Loader';
import type { AppState } from './types/types';
import './App.scss';

const fetchPeople = async (params: Record<string, string> = {}) => {
  const peopleApiUrl = new URL('https://swapi.dev/api/people/');

  for (const [key, value] of Object.entries(params)) {
    if (value.length) peopleApiUrl.searchParams.append(key, value);
  }

  try {
    const response = await fetch(peopleApiUrl);

    if (!response.ok) return [];

    const data = await response.json();

    return data.results;
  } catch (error) {
    return [];
  }
};

class App extends React.Component<undefined, AppState> {
  state: AppState = {
    shouldUpdateData: false,
    isLoading: false,
    currentSearch: null,
    searchValue: '',
    itemsToShow: [],
  };

  updateData(search) {
    if (search === this.state.currentSearch) return;

    this.setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    fetchPeople({ search }).then((data) => {
      this.setState((prevState) => ({
        ...prevState,
        itemsToShow: data,
        currentSearch: search,
        searchValue: search,
        isLoading: false,
      }));
    });
  }

  componentDidMount() {
    this.updateData(localStorage.getItem('rc_lastSearch') ?? '');
  }

  componentDidUpdate() {
    if (this.state.shouldUpdateData) {
      const searchValue = this.state.searchValue.trim();
      localStorage.setItem('rc_lastSearch', searchValue);
      this.updateData(searchValue);
      this.setState((prevState) => ({ ...prevState, shouldUpdateData: false }));
    }
  }

  searchInputHandler(e) {
    this.setState((prevState) => ({
      ...prevState,
      searchValue: e.target.value.trimStart(),
    }));
  }

  searchSubmitHandler(e) {
    e.preventDefault();
    this.setState((prevState) => ({ ...prevState, shouldUpdateData: true }));
  }

  render() {
    return (
      <main className={'wrapper'}>
        <ErrorBoundary
          fallback={
            <p className={'error-message'}>
              Error happened. Please, <a href={'/'}>reload the page</a>.
            </p>
          }
        >
          {this.state.isLoading && <Loader />}
          <SearchBar
            searchValue={this.state.searchValue}
            searchInputHandler={this.searchInputHandler.bind(this)}
            searchSubmitHandler={this.searchSubmitHandler.bind(this)}
          />
          <ContentFrame people={this.state.itemsToShow} />
        </ErrorBoundary>
      </main>
    );
  }
}

export default App;
