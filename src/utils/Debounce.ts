type DebouncedFunction<T extends (...args: unknown[]) => unknown> = (
  ...args: Parameters<T>
) => void;

export default function debounce<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): DebouncedFunction<T> {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>): void => {
    // Clear the previous timer
    if (timer) {
      clearTimeout(timer);
    }

    // Set a new timer
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
