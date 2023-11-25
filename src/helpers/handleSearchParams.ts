export const handleSearchParams = (
  routerAsPath: string,
  newParams: Record<string, string | null>,
): { path: string; search: string } => {
  const [path, currentSearchParams] = routerAsPath.split('?');

  const searchParams = new URLSearchParams(currentSearchParams ?? '');

  for (const [key, value] of Object.entries(newParams)) {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
  }

  const search = searchParams.toString();

  return { path, search };
};
