import { useEffect, useRef, useState } from "react";

const defaultLines = [
  "booting satvik.os",
  "loading modules",
  "mounting /projects /learning /skills",
  "ready",
];

interface BootProps {
  onDone: () => void;
  lines?: string[];
  lineDelay?: number;
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function Boot({ onDone, lines = defaultLines, lineDelay = 220 }: BootProps) {
  const [count, setCount] = useState(() => (prefersReducedMotion() ? lines.length : 0));
  const finished = useRef(false);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    onDone();
  };

  useEffect(() => {
    if (count >= lines.length) {
      const timer = setTimeout(finish, Math.max(lineDelay, 200));
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setCount((value) => value + 1), lineDelay);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    const skip = () => finish();
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, []);

  return (
    <div
      className="h-full p-5 text-sm leading-relaxed"
      onClick={finish}
      role="presentation"
    >
      <div className="grid gap-1">
        {lines.slice(0, count).map((line, index) => (
          <div key={index}>
            <span className="text-amber">[ ok ]</span>{" "}
            <span className="text-muted">{line}</span>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={finish}
        className="mt-4 text-xs text-dim transition-colors hover:text-amber"
      >
        skip ↵
      </button>
    </div>
  );
}
