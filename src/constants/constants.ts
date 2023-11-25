export const LOCAL_STORAGE_SEARCH_VALUE_KEY: string = 'rc_lastSearch';

export const API_URL: string = 'https://swapi.dev/api/';
export const API_PEOPLE_ENDPOINT = 'people';

export enum ITEMS_PER_PAGE {
  DEFAULT = 10,
  DOUBLE = 20,
}

export const FIRST_PAGE: number = 1;

export enum SearchParamsKeys {
  SEARCH_VALUE = 'search',
  PAGE_NUMBER = 'page',
  ITEMS_PER_PAGE = 'limit',
  DETAILS_VIEW_ID = 'details',
}

export enum RoutePath {
  INDEX = '/',
  MAIN = '/main',
  LOADING = '/loading',
}
