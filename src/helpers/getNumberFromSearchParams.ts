export const getNumberFromSearchParams = (
  searchParams: URLSearchParams,
  paramKey: string,
  defaultValue?: number,
): number | null => {
  const value = searchParams.get(paramKey);
  const numberValue = Number(value);

  if (!value || isNaN(numberValue))
    return defaultValue !== undefined ? defaultValue : null;

  return numberValue;
};
