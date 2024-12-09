export default async function fetchData<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, options);
  if (response.status === 401) {
    await fetch("/api/user/token");
    return fetchData<T>(url, options);
  }
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }
  return response.json();
}
