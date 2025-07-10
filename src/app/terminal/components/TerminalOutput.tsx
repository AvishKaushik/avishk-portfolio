"use client";

interface Entry {
  input: string;
  output: string;
}

interface TerminalOutputProps {
  history: Entry[];
}

export default function TerminalOutput({ history }: TerminalOutputProps) {
  return (
    <div className="whitespace-pre-wrap space-y-4">
      {history.map((entry, i) => (
        <div key={i}>
          <div><span className="text-green-300">$</span> {entry.input}</div>
          <div>{entry.output}</div>
        </div>
      ))}
    </div>
  );
}
