import type {
  ChangeEvent,
  FormEventHandler,
  MutableRefObject,
  ReactElement,
} from 'react';
import type { Person } from './apiTypes';

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

export interface MainProps {
  searchValue: string;
  shouldUpdateData: boolean;
  setIsLoading: (value: ((prevState: boolean) => boolean) | boolean) => void;
  setSearchValue: (
    value: ((prevState: string | null) => string | null) | string | null,
  ) => void;
  setShouldUpdateData: (
    value: ((prevState: boolean) => boolean) | boolean,
  ) => void;
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

export interface NavBarProps {
  people: Person[];
  totalPeopleCount: MutableRefObject<number>;
  setShouldUpdateData: (
    value: ((prevState: boolean) => boolean) | boolean,
  ) => void;
}

export interface SelectProps {
  wrapperClassName: string;
  title: string;
  selectName: string;
  defaultValue: number | string;
  changeHandler: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: number[] | string[];
}

export interface PaginateProps {
  pageNumber: number;
  changePageHandler: (selectedItem: { selected: number }) => void;
  pageRangeDisplayed: number;
  pageCount: number;
}

export interface NavItemProps {
  person: Person;
}
