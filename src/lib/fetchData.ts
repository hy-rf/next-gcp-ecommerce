export default async function fetchData<T>(
  url: string,
  options?: RequestInit
): Promise<T | null> {
  const response = await fetch(url, options);
  if (response.status === 401) {
    await fetch("/api/user/token");
    const data = await fetch(url, options);
    return data.json();
  }
  if (!response.ok) {
    return null;
  }
  return response.json();
}
