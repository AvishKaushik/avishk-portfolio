"use client";

import TerminalOutput from "./TerminalOutput";
import TerminalInput from "./TerminalInput";

interface Entry {
  input: string;
  output: string;
}

interface TerminalWindowProps {
  history: Entry[];
  onCommand: (input: string) => void;
}

export default function TerminalWindow({ history, onCommand }: TerminalWindowProps) {
  return (
    <div className="relative bg-black border border-green-500 rounded-xl shadow-2xl p-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-white/10 via-black to-black pointer-events-none" />
      <div className="relative z-10">
        <TerminalOutput history={history} />
        <TerminalInput onSubmit={onCommand} />
      </div>
    </div>
  );
}
