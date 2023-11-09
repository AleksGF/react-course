export async function fetchApi<T>(url: string): Promise<T | null> {
  const method = 'GET';
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, { method, headers });

    if (!response.ok) return null;

    return (await response.json()) as T;
  } catch (error) {
    return null;
  }
}
