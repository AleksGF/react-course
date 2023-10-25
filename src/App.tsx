import React from 'react';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SearchBar from './components/SearchBar/SearchBar';
import ContentFrame from './components/ContentFrame/ContentFrame';
import './App.css';

class App extends React.Component<undefined, undefined> {
  render() {
    return (
      <ErrorBoundary>
        <SearchBar />
        <ContentFrame />
      </ErrorBoundary>
    );
  }
}

export default App;
