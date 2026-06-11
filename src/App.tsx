const bootLines = [
  "booting satvik.os",
  "loading modules",
  "mounting /projects /learning /writing",
  "ready",
];

const chips = ["help", "whoami", "projects", "learning", "skills", "writing", "connect"];

export default function App() {
  return (
    <main className="flex min-h-full items-center justify-center p-4">
      <section className="w-full max-w-2xl overflow-hidden rounded-lg border border-amber/20">
        <header className="flex items-center gap-2 border-b border-white/5 bg-white/[0.02] px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-amber" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="ml-2 text-xs text-dim">satvik.os — bash</span>
        </header>

        <div className="bg-surface px-5 py-5 text-sm leading-relaxed">
          {bootLines.map((line) => (
            <div key={line} className="text-muted">
              <span className="text-amber">[ ok ]</span> {line}
            </div>
          ))}

          <div className="mt-4 text-amber">
            satvik@portfolio<span className="text-muted">:~$</span>{" "}
            <span className="inline-block h-3.5 w-2 translate-y-0.5 animate-pulse bg-amber" />
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {chips.map((chip, i) => (
              <span
                key={chip}
                className={
                  i === 0
                    ? "rounded border border-amber/50 px-2 py-0.5 text-xs text-amber"
                    : "rounded border border-white/10 px-2 py-0.5 text-xs text-dim"
                }
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
