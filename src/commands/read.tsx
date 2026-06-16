import type { Command } from "../lib/types";
import { findPost } from "../content/posts";
import { Markdown } from "../components/Markdown";

export const read: Command = {
  name: "read",
  description: "read a post — read <slug>",
  hidden: true,
  run: (args) => {
    const slug = args[0];
    const post = slug ? findPost(slug) : undefined;
    if (!post) {
      return (
        <div className="text-muted">
          no post named <span className="text-fg">{slug ?? ""}</span> — try{" "}
          <span className="text-amber">writing</span>
        </div>
      );
    }
    return (
      <div>
        <div className="text-fg">{post.title}</div>
        <div className="mb-3 text-dim">{post.date}</div>
        <Markdown>{post.body}</Markdown>
      </div>
    );
  },
};
