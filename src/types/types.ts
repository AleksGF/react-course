import { FormEventHandler } from 'react';
import { Person } from './apiTypes';

export interface AppState {
  shouldUpdateData: boolean;
  isLoading: boolean;
  currentSearch: string | null;
  searchValue: string;
  itemsToShow: Person[];
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

export interface ContentFrameProps {
  people: Person[];
}

export interface ContentItemProps {
  person: Person;
}
