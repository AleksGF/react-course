import { getSavedSearchValue, saveSearchValue } from '@src/store/mainSlice';
import { LOCAL_STORAGE_SEARCH_VALUE_KEY } from '@src/constants/constants';

const testValue = 'test_value';
const mockGetItem = jest
  .spyOn(Storage.prototype, 'getItem')
  .mockImplementation(() => testValue);

const mockSetItem = jest.spyOn(Storage.prototype, 'setItem');

const dispatch = jest.fn();

describe('Thunks of mainReducer should work correctly', () => {
  afterEach(() => {
    mockGetItem.mockClear();
    mockSetItem.mockClear();
    dispatch.mockClear();
  });

  test('getSavedSearchValue should get value from localStorage and dispatch it', async () => {
    const thunk = getSavedSearchValue();

    expect(mockGetItem.mock.calls).toHaveLength(0);
    expect(dispatch.mock.calls).toHaveLength(0);

    await thunk(dispatch, () => ({}), {});

    expect(mockGetItem.mock.calls).toHaveLength(1);
    expect(mockGetItem.mock.lastCall).toEqual([LOCAL_STORAGE_SEARCH_VALUE_KEY]);
    expect(mockGetItem.mock.results[0].value).toBe(testValue);
    expect(dispatch.mock.calls).toHaveLength(3);
    expect(dispatch.mock.calls[1][0].payload).toBe(testValue);
  });

  test('saveSearchValue should save value to localStorage and dispatch it', async () => {
    const thunk = saveSearchValue(testValue);

    expect(mockSetItem.mock.calls).toHaveLength(0);
    expect(dispatch.mock.calls).toHaveLength(0);

    await thunk(dispatch, () => ({}), {});

    expect(mockSetItem.mock.calls).toHaveLength(1);
    expect(mockSetItem.mock.lastCall).toEqual([
      LOCAL_STORAGE_SEARCH_VALUE_KEY,
      testValue,
    ]);
    expect(dispatch.mock.calls).toHaveLength(3);
    expect(dispatch.mock.calls[1][0].payload).toBe(testValue);
  });
});
