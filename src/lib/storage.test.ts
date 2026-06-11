import { describe, it, expect, beforeEach, vi } from "vitest";
import { getMode, setMode, hasBooted, markBooted } from "./storage";

beforeEach(() => localStorage.clear());

describe("mode persistence", () => {
  it("returns null before any mode is saved", () => {
    expect(getMode()).toBeNull();
  });

  it("round-trips a saved mode", () => {
    setMode("standard");
    expect(getMode()).toBe("standard");
  });

  it("ignores an invalid stored mode", () => {
    localStorage.setItem("satvik.os:mode", "banana");
    expect(getMode()).toBeNull();
  });
});

describe("boot flag", () => {
  it("is false before the first boot", () => {
    expect(hasBooted()).toBe(false);
  });

  it("is true once marked", () => {
    markBooted();
    expect(hasBooted()).toBe(true);
  });
});

describe("resilience", () => {
  it("returns null when storage throws", () => {
    const spy = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(getMode()).toBeNull();
    spy.mockRestore();
  });
});
