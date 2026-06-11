import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { parse } from "./parse";
import { commands, findCommand } from "../commands/index";
import { ChipBar } from "../components/ChipBar";
import type { CommandContext } from "../lib/types";

interface Entry {
  id: number;
  input: string;
  output: ReactNode;
}

function Prompt() {
  return (
    <span className="shrink-0 select-none pr-2">
      <span className="text-amber">satvik@portfolio</span>
      <span className="text-muted">:~$</span>
    </span>
  );
}

function notFound(name: string): ReactNode {
  return (
    <div className="text-muted">
      command not found: <span className="text-fg">{name}</span> — try{" "}
      <span className="text-amber">help</span>
    </div>
  );
}

export function Shell() {
  const [transcript, setTranscript] = useState<Entry[]>([]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const nextId = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [transcript]);

  function append(typed: string, output: ReactNode) {
    setTranscript((entries) => [...entries, { id: nextId.current++, input: typed, output }]);
  }

  function run(raw: string) {
    const { name, args } = parse(raw);
    if (name === "") return;

    const typed = raw.trim();
    setHistory((entries) => [...entries, typed]);
    setHistoryIndex(null);

    const command = findCommand(name);
    if (!command) {
      append(typed, notFound(name));
      return;
    }

    let cleared = false;
    const ctx: CommandContext = {
      run,
      commands,
      clear: () => {
        cleared = true;
        setTranscript([]);
      },
    };
    const output = command.run(args, ctx);
    if (cleared) return;
    append(typed, output);
  }

  function submitFromChip(name: string) {
    run(name);
    setValue("");
    inputRef.current?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      run(value);
      setValue("");
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length === 0) return;
      const index = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(index);
      setValue(history[index]);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex === null) return;
      const index = historyIndex + 1;
      if (index >= history.length) {
        setHistoryIndex(null);
        setValue("");
      } else {
        setHistoryIndex(index);
        setValue(history[index]);
      }
      return;
    }
    if (event.key === "Tab") {
      event.preventDefault();
      const partial = value.trim().toLowerCase();
      if (partial === "" || partial.includes(" ")) return;
      const match = commands.find((command) => command.name.startsWith(partial));
      if (match) setValue(match.name);
    }
  }

  return (
    <div className="flex h-full flex-col text-sm leading-relaxed">
      <div
        className="min-h-0 flex-1 overflow-y-auto px-5 py-5"
        onClick={() => inputRef.current?.focus()}
      >
        {transcript.map((entry) => (
          <div key={entry.id} className="mb-2">
            <div className="flex">
              <Prompt />
              <span className="whitespace-pre-wrap break-words">{entry.input}</span>
            </div>
            {entry.output != null && <div className="mt-1">{entry.output}</div>}
          </div>
        ))}
        <div className="flex">
          <Prompt />
          <input
            ref={inputRef}
            aria-label="terminal input"
            className="caret-amber min-w-0 flex-1 bg-transparent text-fg outline-none"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={onKeyDown}
            autoFocus
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </div>
        <div ref={endRef} />
      </div>

      <div className="border-t border-white/5 px-5 py-3">
        <ChipBar commands={commands} onRun={submitFromChip} />
      </div>
    </div>
  );
}
