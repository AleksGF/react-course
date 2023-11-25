export async function fetchApi<T>(url: string): Promise<T | never> {
  const method = 'GET';
  const headers = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, { method, headers });

  if (!response.ok) throw new Error('API error');

  return (await response.json()) as T;
}
