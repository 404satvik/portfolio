import type { Command } from "../lib/types";
import { posts } from "../content/posts";

export const writing: Command = {
  name: "writing",
  description: "notes & dev-log",
  run: (_args, ctx) => (
    <div className="grid gap-2">
      {posts.map((post) => (
        <button
          key={post.slug}
          type="button"
          onClick={() => ctx.run(`read ${post.slug}`)}
          className="flex items-baseline gap-3 text-left"
        >
          <span className="text-dim">{post.date}</span>
          <span className="text-fg transition-colors hover:text-amber">{post.title}</span>
        </button>
      ))}
      <div className="text-dim">
        › type <span className="text-amber">read &lt;slug&gt;</span> or click a title
      </div>
    </div>
  ),
};
