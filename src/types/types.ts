import type { ChangeEvent, MutableRefObject } from 'react';
import type { Person } from './apiTypes';

export interface LayoutProps {
  isLoading: boolean;
  searchValue: string;
  setSearchValue: (
    value: ((prevState: string | null) => string | null) | string | null,
  ) => void;
  setShouldUpdateData: (
    value: ((prevState: boolean) => boolean) | boolean,
  ) => void;
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
  setSearchValue: (
    value: ((prevState: string | null) => string | null) | string | null,
  ) => void;
}

export interface SearchBarProps extends InputFieldProps {
  setShouldUpdateData: (
    value: ((prevState: boolean) => boolean) | boolean,
  ) => void;
}

export interface ButtonProps {
  title: string;
  classType: 'submit-button' | 'error-button';
  clickHandler?: () => void;
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
