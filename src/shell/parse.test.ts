import { describe, it, expect } from "vitest";
import { parse } from "./parse";

describe("parse", () => {
  it("reads a bare command with no arguments", () => {
    expect(parse("whoami")).toEqual({ name: "whoami", args: [] });
  });

  it("splits a command from its arguments", () => {
    expect(parse("projects satvik.os")).toEqual({
      name: "projects",
      args: ["satvik.os"],
    });
  });

  it("trims surrounding whitespace and collapses gaps", () => {
    expect(parse("  echo   hello   world ")).toEqual({
      name: "echo",
      args: ["hello", "world"],
    });
  });

  it("lowercases the command name but preserves argument case", () => {
    expect(parse("Projects MyApp")).toEqual({
      name: "projects",
      args: ["MyApp"],
    });
  });

  it("returns an empty command for blank input", () => {
    expect(parse("   ")).toEqual({ name: "", args: [] });
  });
});
