import help from "./help";
import cd from "./cd";
import ls from "./ls";
import cat from "./cat";
import open from "./open";
import clear from "./clear";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const commandMap: Record<string, (...args: any[]) => any> = {
  help,
  cd,
  ls,
  cat,
  open,
  clear,
};

export function loadCommands(cmd: string) {
  return commandMap[cmd];
}
