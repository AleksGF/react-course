import reducer, {
  setInitializationStatus,
  setLoadingStatus,
  type AppState,
} from '@src/store/appSlice';

const initialState: AppState = {
  isInitialized: false,
  isLoading: false,
};

const initializedState: AppState = {
  isInitialized: true,
  isLoading: false,
};

const loadingState: AppState = {
  isInitialized: true,
  isLoading: true,
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
});
