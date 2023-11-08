import type { ChangeEvent, MutableRefObject } from 'react';
import type { Person } from '@types/apiTypes';

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
