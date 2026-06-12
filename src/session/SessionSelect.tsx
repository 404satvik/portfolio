import { useEffect, useState } from "react";
import type { Mode } from "../lib/storage";

interface Option {
  mode: Mode;
  label: string;
  description: string;
}

const options: Option[] = [
  { mode: "terminal", label: "terminal", description: "full interactive shell — type or click" },
  { mode: "standard", label: "standard", description: "classic page — just scroll and read" },
];

interface SessionSelectProps {
  onSelect: (mode: Mode) => void;
}

export function SessionSelect({ onSelect }: SessionSelectProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setIndex((value) => Math.min(options.length - 1, value + 1));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setIndex((value) => Math.max(0, value - 1));
      } else if (event.key === "Enter") {
        event.preventDefault();
        onSelect(options[index].mode);
      } else if (event.key === "1") {
        onSelect("terminal");
      } else if (event.key === "2") {
        onSelect("standard");
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onSelect]);

  return (
    <div className="h-full p-5 text-sm leading-relaxed">
      <div className="mb-1">
        <span className="text-amber">[ ok ]</span>{" "}
        <span className="text-muted">ready</span>
      </div>
      <div className="mb-3 mt-4 text-dim">select session:</div>
      <div className="grid gap-2">
        {options.map((option, i) => (
          <button
            key={option.mode}
            type="button"
            onClick={() => onSelect(option.mode)}
            onMouseEnter={() => setIndex(i)}
            className={`rounded border px-4 py-3 text-left transition-colors ${
              i === index
                ? "border-amber/60 bg-amber/[0.06]"
                : "border-white/10 hover:border-white/20"
            }`}
          >
            <div>
              <span className="text-amber">{i === index ? "▸" : " "} [{i + 1}]</span>{" "}
              <span className={i === index ? "text-fg" : "text-muted"}>{option.label}</span>
            </div>
            <div className="mt-0.5 text-xs text-dim">{option.description}</div>
          </button>
        ))}
      </div>
      <div className="mt-4 text-xs text-dim">
        ↑/↓ to choose · enter to launch · we'll remember your pick
      </div>
    </div>
  );
}
