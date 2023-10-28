import type { FormEventHandler, ReactElement } from 'react';
import { Person } from './apiTypes';

export interface AppState {
  shouldUpdateData: boolean;
  isLoading: boolean;
  currentSearch: string | null;
  searchValue: string;
  itemsToShow: Person[];
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface ErrorBoundaryProps {
  fallback: ReactElement;
}

export interface InputFieldProps {
  searchValue: string;
  searchInputHandler: FormEventHandler<HTMLInputElement>;
}

export interface ButtonProps {
  title: string;
  classType: 'SubmitButton' | 'ErrorButton';
  clickHandler?: () => void;
}

export interface SearchBarProps extends InputFieldProps {
  searchSubmitHandler: FormEventHandler<HTMLFormElement>;
}

export interface SearchBarState {
  shouldErrorHappened: boolean;
}

export interface ContentFrameProps {
  people: Person[];
}

export interface ContentItemProps {
  person: Person;
}
