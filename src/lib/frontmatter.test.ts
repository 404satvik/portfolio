import { describe, it, expect } from "vitest";
import { parseFrontmatter } from "./frontmatter";

describe("parseFrontmatter", () => {
  it("extracts key/value metadata and the body", () => {
    const raw = "---\ntitle: Hello World\ndate: 2026-06-15\n---\nthis is the body";
    const { meta, body } = parseFrontmatter(raw);
    expect(meta.title).toBe("Hello World");
    expect(meta.date).toBe("2026-06-15");
    expect(body).toBe("this is the body");
  });

  it("returns empty meta when there is no frontmatter", () => {
    const { meta, body } = parseFrontmatter("just content");
    expect(meta).toEqual({});
    expect(body).toBe("just content");
  });

  it("trims whitespace around values and body", () => {
    const raw = "---\ntitle:   Spaced   \n---\n\n  body text  ";
    const { meta, body } = parseFrontmatter(raw);
    expect(meta.title).toBe("Spaced");
    expect(body).toBe("body text");
  });
});
