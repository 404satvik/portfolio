import { useState } from "react";
import type { ReactNode } from "react";
import { Shell } from "./shell/Shell";
import { StandardPage } from "./standard/StandardPage";
import { Boot } from "./boot/Boot";
import { hasBooted, markBooted } from "./lib/storage";
import type { Mode } from "./lib/storage";

function Frame({ children, headerRight }: { children: ReactNode; headerRight?: ReactNode }) {
  return (
    <main className="flex min-h-full items-center justify-center p-4 sm:p-6">
      <section className="flex h-[85vh] max-h-[760px] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-amber/20 shadow-2xl shadow-black/50 ring-1 ring-black/40">
        <header className="flex items-center gap-2 border-b border-white/5 bg-white/[0.03] px-4 py-3">
          <span className="size-3 rounded-full bg-amber" />
          <span className="size-3 rounded-full bg-white/15" />
          <span className="size-3 rounded-full bg-white/15" />
          <span className="ml-2 text-[13px] text-dim">satvik.os — bash</span>
          {headerRight && <div className="ml-auto">{headerRight}</div>}
        </header>
        <div className="min-h-0 flex-1 bg-surface">{children}</div>
      </section>
    </main>
  );
}

export default function App() {
  const [mode, setMode] = useState<Mode>("standard");
  const [booting, setBooting] = useState(false);

  function enterTerminal() {
    if (hasBooted()) {
      setMode("terminal");
    } else {
      setBooting(true);
    }
  }

  function finishBoot() {
    markBooted();
    setBooting(false);
    setMode("terminal");
  }

  if (booting) {
    return (
      <Frame>
        <Boot onDone={finishBoot} />
      </Frame>
    );
  }

  if (mode === "standard") {
    return (
      <main className="min-h-full">
        <StandardPage onEnterTerminal={enterTerminal} />
      </main>
    );
  }

  return (
    <Frame
      headerRight={
        <button
          type="button"
          onClick={() => setMode("standard")}
          className="text-xs text-dim transition-colors hover:text-amber"
        >
          standard mode ↗
        </button>
      }
    >
      <Shell />
    </Frame>
  );
}
