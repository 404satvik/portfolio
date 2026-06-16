import { parseFrontmatter } from "../lib/frontmatter";

export interface Post {
  slug: string;
  title: string;
  date: string;
  body: string;
}

const files = import.meta.glob("./posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

export const posts: Post[] = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split("/").pop()!.replace(/\.md$/, "");
    const { meta, body } = parseFrontmatter(raw);
    return { slug, title: meta.title ?? slug, date: meta.date ?? "", body };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export function findPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
