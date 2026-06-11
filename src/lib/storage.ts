export type Mode = "terminal" | "standard";

const MODE_KEY = "satvik.os:mode";
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

export function getMode(): Mode | null {
  const value = read(MODE_KEY);
  return value === "terminal" || value === "standard" ? value : null;
}

export function setMode(mode: Mode): void {
  write(MODE_KEY, mode);
}

export function hasBooted(): boolean {
  return read(BOOT_KEY) === "1";
}

export function markBooted(): void {
  write(BOOT_KEY, "1");
}
