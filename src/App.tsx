import { useState } from "react";
import type { ReactNode } from "react";
import { Shell } from "./shell/Shell";
import { StandardPage } from "./standard/StandardPage";
import { Boot } from "./boot/Boot";
import { SessionSelect } from "./session/SessionSelect";
import { getMode, setMode, hasBooted, markBooted } from "./lib/storage";
import type { Mode } from "./lib/storage";

type Phase = "boot" | "select" | "ready";

function Frame({ children, headerRight }: { children: ReactNode; headerRight?: ReactNode }) {
  return (
    <main className="flex min-h-full items-center justify-center p-4">
      <section className="flex h-[80vh] max-h-[640px] w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-amber/20">
        <header className="flex items-center gap-2 border-b border-white/5 bg-white/[0.02] px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-amber" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="ml-2 text-xs text-dim">satvik.os — bash</span>
          {headerRight && <div className="ml-auto">{headerRight}</div>}
        </header>
        <div className="min-h-0 flex-1 bg-surface">{children}</div>
      </section>
    </main>
  );
}

export default function App() {
  const [phase, setPhase] = useState<Phase>(() => (hasBooted() ? "ready" : "boot"));
  const [mode, setModeState] = useState<Mode>(() => getMode() ?? "terminal");

  function changeMode(next: Mode) {
    setModeState(next);
    setMode(next);
  }

  function chooseSession(next: Mode) {
    markBooted();
    changeMode(next);
    setPhase("ready");
  }

  if (phase === "boot") {
    return (
      <Frame>
        <Boot onDone={() => setPhase("select")} />
      </Frame>
    );
  }

  if (phase === "select") {
    return (
      <Frame>
        <SessionSelect onSelect={chooseSession} />
      </Frame>
    );
  }

  if (mode === "standard") {
    return (
      <main className="min-h-full">
        <StandardPage onEnterTerminal={() => changeMode("terminal")} />
      </main>
    );
  }

  return (
    <Frame
      headerRight={
        <button
          type="button"
          onClick={() => changeMode("standard")}
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
