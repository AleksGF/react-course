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

export interface LayoutProps {
  isLoading: boolean;
  searchValue: string;
  searchInputHandler: FormEventHandler<HTMLInputElement>;
  searchSubmitHandler: FormEventHandler<HTMLFormElement>;
}

export interface InputFieldProps {
  searchValue: string;
  searchInputHandler: FormEventHandler<HTMLInputElement>;
}

export interface ButtonProps {
  title: string;
  classType: 'submit-button' | 'error-button';
  clickHandler?: () => void;
}

export interface SearchBarProps extends InputFieldProps {
  searchSubmitHandler: FormEventHandler<HTMLFormElement>;
}

export interface ContentFrameProps {
  people: Person[];
}

export interface ContentItemProps {
  person: Person;
}
