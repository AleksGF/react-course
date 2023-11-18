import reducer, {
  type MainState,
  setItemsPerPage,
  setSearchValue,
  showPersonDetails,
  hidePersonDetails,
} from '@src/store/mainSlice';
import { ITEMS_PER_PAGE } from '@src/constants/constants';

const initialState: MainState = {
  searchValue: '',
  itemsPerPage: ITEMS_PER_PAGE.DEFAULT,
  detailsView: null,
};

const stateWithDoubleItems: MainState = {
  searchValue: '',
  itemsPerPage: ITEMS_PER_PAGE.DOUBLE,
  detailsView: null,
};

const getStateWithSearchValue = (value: string): MainState => ({
  ...initialState,
  searchValue: value,
});

const getStateWithDetails = (value: number): MainState => ({
  ...initialState,
  detailsView: value,
});

describe('mainReducer should work correctly', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  test('setSearchValue should set searchValue', () => {
    expect(reducer(initialState, setSearchValue('some'))).toEqual(
      getStateWithSearchValue('some'),
    );

    expect(
      reducer(getStateWithSearchValue('some'), setSearchValue('new')),
    ).toEqual(getStateWithSearchValue('new'));

    expect(
      reducer(getStateWithSearchValue('some'), setSearchValue('')),
    ).toEqual(initialState);
  });

  test('setItemsPerPage should set itemsPerPage', () => {
    expect(
      reducer(initialState, setItemsPerPage(ITEMS_PER_PAGE.DOUBLE)),
    ).toEqual(stateWithDoubleItems);

    expect(
      reducer(stateWithDoubleItems, setItemsPerPage(ITEMS_PER_PAGE.DEFAULT)),
    ).toEqual(initialState);
  });

  test('showPersonDetails should set detailsView', () => {
    expect(reducer(initialState, showPersonDetails(1))).toEqual(
      getStateWithDetails(1),
    );

    expect(reducer(initialState, showPersonDetails(5))).toEqual(
      getStateWithDetails(5),
    );

    expect(reducer(initialState, showPersonDetails(97))).toEqual(
      getStateWithDetails(97),
    );
  });

  test('hidePersonDetails should set detailsView to null', () => {
    expect(reducer(getStateWithDetails(1), hidePersonDetails())).toEqual(
      initialState,
    );

    expect(reducer(getStateWithDetails(7), hidePersonDetails())).toEqual(
      initialState,
    );

    expect(reducer(getStateWithDetails(83), hidePersonDetails())).toEqual(
      initialState,
    );
  });
});
