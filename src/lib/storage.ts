export type Mode = "terminal" | "standard";

const BOOT_KEY = "satvik.os:booted";

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    return;
  }
}

export function hasBooted(): boolean {
  return read(BOOT_KEY) === "1";
}

export function markBooted(): void {
  write(BOOT_KEY, "1");
}
