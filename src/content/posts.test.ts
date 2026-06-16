import { describe, it, expect } from "vitest";
import { posts, findPost } from "./posts";

describe("posts", () => {
  it("loads the markdown posts with title, date, body and slug", () => {
    expect(posts.length).toBeGreaterThanOrEqual(2);
    for (const post of posts) {
      expect(post.slug).toBeTruthy();
      expect(post.title).toBeTruthy();
      expect(post.date).toBeTruthy();
      expect(post.body).toBeTruthy();
    }
  });

  it("sorts posts newest first", () => {
    const dates = posts.map((post) => post.date);
    const sorted = [...dates].sort((a, b) => b.localeCompare(a));
    expect(dates).toEqual(sorted);
  });

  it("finds a post by slug", () => {
    expect(findPost("building-satvik-os")?.title).toBe("building satvik.os");
  });

  it("returns undefined for an unknown slug", () => {
    expect(findPost("nope")).toBeUndefined();
  });
});
