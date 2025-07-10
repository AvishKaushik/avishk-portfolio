'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { processCommand } from '@/lib/commandProcessor';

export default function TerminalShell() {
  const [history, setHistory] = useState<string[]>([
    'Welcome to Avish Terminal. Type `help` to begin.',
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  /** keep view pinned to bottom on new output */
  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [history]);

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    const cmd = input.trim();
    const output = processCommand(cmd);

    setHistory((prev) => [...prev, `$ ${cmd}`, ...output]);
    setInput('');
  };

  return (
    <div
      ref={scrollRef}
      className="h-full overflow-y-auto p-4 font-mono text-green-400"
    >
      {history.map((line, i) => (
        <div key={i}>{line}</div>
      ))}

      <div className="flex">
        <span className="pr-2">$</span>
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          className="w-full bg-transparent outline-none caret-green-400 animate-blink"
        />
      </div>
    </div>
  );
}
