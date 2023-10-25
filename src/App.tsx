import React from 'react';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SearchBar from './components/SearchBar/SearchBar';
import ContentFrame from './components/ContentFrame/ContentFrame';
import Loader from './components/common/Loader/Loader';
import './App.css';

class App extends React.Component<undefined, undefined> {
  render() {
    return (
      <ErrorBoundary>
        <SearchBar />
        <ContentFrame />
        <Loader />
      </ErrorBoundary>
    );
  }
}

export default App;
