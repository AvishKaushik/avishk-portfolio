'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Palette, Gamepad2, Terminal } from 'lucide-react';

const MODES = [
  { id: 'aesthetic', label: 'Aesthetic', icon: Palette, href: '/aesthetic' },
  { id: 'game', label: 'Game', icon: Gamepad2, href: '/game' },
  { id: 'terminal', label: 'Terminal', icon: Terminal, href: '/terminal' },
];

export default function ModeMenu() {
  const pathname = usePathname() ?? '';
  const current = MODES.find((m) => pathname.startsWith(m.href)) ?? MODES[0];
  const others = MODES.filter((m) => m.id !== current.id);

  const CurrentIcon = current.icon;
  const TopIcon = others[0].icon;
  const BottomIcon = others[1].icon;

  return (
    <div className="absolute inline-flex flex-col items-center overflow-hidden
        w-12 h-12                                  /* 48 px closed */
        bg-background/80 backdrop-blur rounded-xl shadow-lg
        ring-1 ring-border/20
        hover:h-36 transition-all duration-300     /* 144 px open  */
        group       ">
      {/* ── Top Option ── */}
      <Link
        href={others[0].href}
        className="absolute opacity-0 group-hover:opacity-100 transition
                   px-3 py-2 rounded-lg bg-background shadow hover:bg-accent flex items-center gap-1"
      >
        <TopIcon className="h-4 w-4" />
      </Link>

      {/* ── Trigger ── */}
      <Link
        href={current.href}
        className="rounded-lg bg-background shadow hover:bg-accent flex items-center gap-2 transition"
      >
        <CurrentIcon className="h-4 w-4" />
      </Link>

      {/* ── Bottom Option ── */}
      <Link
        href={others[1].href}
        className="absolute top-14 opacity-0 group-hover:opacity-100 transition
                   rounded-lg bg-background shadow hover:bg-accent flex items-center gap-2"
      >
        <BottomIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}
