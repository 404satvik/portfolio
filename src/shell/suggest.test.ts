import { describe, it, expect } from "vitest";
import { suggest } from "./suggest";

const names = ["help", "whoami", "projects", "learning", "skills", "connect", "clear"];

describe("suggest", () => {
  it("suggests the closest command for a small typo", () => {
    expect(suggest("porjects", names)).toBe("projects");
  });

  it("corrects a single missing letter", () => {
    expect(suggest("hel", names)).toBe("help");
  });

  it("picks the nearest of several near matches", () => {
    expect(suggest("skils", names)).toBe("skills");
  });

  it("returns null when nothing is close enough", () => {
    expect(suggest("zzzzzz", names)).toBeNull();
  });
});
