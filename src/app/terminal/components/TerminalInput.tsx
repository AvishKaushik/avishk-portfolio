"use client";

import { useState } from "react";

interface TerminalInputProps {
  onSubmit: (input: string) => void;
}

export default function TerminalInput({ onSubmit }: TerminalInputProps) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit(input.trim());
      setInput("");
    }
  };

  return (
    <div className="flex items-center mt-2">
      <span className="text-green-300">$</span>
      <input
        type="text"
        className="bg-transparent text-green-400 outline-none ml-2 flex-1"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </div>
  );
}
