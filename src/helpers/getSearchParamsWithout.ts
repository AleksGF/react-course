export const getSearchParamsWithout = (
  searchParams: URLSearchParams,
  params: string[],
): URLSearchParams => {
  const newSearchParams = new URLSearchParams(searchParams);
  for (const key of params) {
    newSearchParams.delete(key);
  }

  return newSearchParams;
};
