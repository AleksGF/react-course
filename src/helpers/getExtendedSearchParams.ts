export const getExtendedSearchParams = (
  searchParams: URLSearchParams,
  params: Record<string, string>,
): URLSearchParams => {
  const newSearchParams = new URLSearchParams(searchParams);
  for (const [key, value] of Object.entries(params)) {
    newSearchParams.set(key, value);
  }

  return newSearchParams;
};
