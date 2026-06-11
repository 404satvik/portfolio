import { Shell } from "./shell/Shell";

export default function App() {
  return (
    <main className="flex min-h-full items-center justify-center p-4">
      <section className="flex h-[80vh] max-h-[640px] w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-amber/20">
        <header className="flex items-center gap-2 border-b border-white/5 bg-white/[0.02] px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-amber" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="ml-2 text-xs text-dim">satvik.os — bash</span>
        </header>
        <div className="min-h-0 flex-1 bg-surface">
          <Shell />
        </div>
      </section>
    </main>
  );
}
