export const getExtendedSearchParams = (
  searchParams: URLSearchParams,
  key: string,
  value: string
): URLSearchParams => {
  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.set(key, value);

  return newSearchParams;
};
