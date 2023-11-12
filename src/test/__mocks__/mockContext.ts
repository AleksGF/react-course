const searchContextProps = {
  searchValue: '',
  setSearchValue: jest.fn(),
};

const dataListContextProps = {
  people: [],
  setPeople: jest.fn(),
  totalPeopleCount: 0,
  setTotalPeopleCount: jest.fn(),
};

const loadingStatusContextProps = {
  isLoading: false,
  setIsLoading: jest.fn(),
};

export const mockContextsProps = {
  searchContextProps,
  dataListContextProps,
  loadingStatusContextProps,
};
