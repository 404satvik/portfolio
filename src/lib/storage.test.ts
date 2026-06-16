import { describe, it, expect, beforeEach, vi } from "vitest";
import { hasBooted, markBooted } from "./storage";

beforeEach(() => localStorage.clear());

describe("boot flag", () => {
  it("is false before the first boot", () => {
    expect(hasBooted()).toBe(false);
  });

  it("is true once marked", () => {
    markBooted();
    expect(hasBooted()).toBe(true);
  });

  it("stays false when storage throws", () => {
    const spy = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(hasBooted()).toBe(false);
    spy.mockRestore();
  });
});
