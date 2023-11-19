import reducer, {
  setInitializationStatus,
  setLoadingStatus,
  setDetailsLoadingStatus,
  type AppState,
} from '@src/store/appSlice';
import {
  initialState as mockInitialState,
  stateWithInitialization as mockInitializedState,
} from '@src/test/__mocks__/mockStore';

const initialState: AppState = {
  ...mockInitialState.app,
};

const initializedState: AppState = {
  ...mockInitializedState.app,
};

const loadingState: AppState = {
  ...initializedState,
  isLoading: true,
};

const detailsLoadingState: AppState = {
  ...initializedState,
  isDetailsLoading: true,
};

describe('appReducer should work correctly', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  test('setInitializationStatus should set isInitialized', () => {
    expect(reducer(initialState, setInitializationStatus(true))).toEqual(
      initializedState,
    );

    expect(reducer(initializedState, setInitializationStatus(false))).toEqual(
      initialState,
    );
  });

  test('setLoadingStatus should set isLoading', () => {
    expect(reducer(initializedState, setLoadingStatus(true))).toEqual(
      loadingState,
    );

    expect(reducer(loadingState, setLoadingStatus(false))).toEqual(
      initializedState,
    );
  });

  test('setDetailsLoadingStatus should set isDetailsLoading', () => {
    expect(reducer(initializedState, setDetailsLoadingStatus(true))).toEqual(
      detailsLoadingState,
    );

    expect(
      reducer(detailsLoadingState, setDetailsLoadingStatus(false)),
    ).toEqual(initializedState);
  });
});
