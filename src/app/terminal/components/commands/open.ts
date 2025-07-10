export default function open({ args }: { args: string[] }) {
    const url = args[0];
    if (url?.startsWith("http")) {
      window.open(url, "_blank");
      return `Opening ${url}...`;
    }
    return "open: invalid URL";
  }
  