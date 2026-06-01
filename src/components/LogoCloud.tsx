'use client';

import { useState } from 'react';
import { tools } from '@/data/logos';

function LogoTile({ name, slug, color }: { name: string; slug: string; color: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-zinc-100 bg-white/80 px-3 py-2 shadow-sm backdrop-blur-sm">
      {!failed ? (
        <img
          src={`https://cdn.simpleicons.org/${slug}/${color}`}
          alt={name}
          className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-zinc-100 text-[6px] font-bold text-zinc-400 uppercase sm:h-5 sm:w-5 sm:text-[8px]">
          {name[0]}
        </span>
      )}
      <span className="whitespace-nowrap text-[10px] font-medium text-zinc-600 sm:text-xs">{name}</span>
    </div>
  );
}

function MarqueeRow({
  row,
  reverse,
  isPaused,
}: {
  row: typeof tools;
  reverse: boolean;
  isPaused: boolean;
}) {
  return (
    <div
      className="flex gap-2 sm:gap-3"
      style={{
        animation: `marquee-${reverse ? 'reverse' : 'forward'} 60s linear infinite`,
        animationPlayState: isPaused ? 'paused' : 'running',
        width: 'max-content',
      }}
    >
      {[...row, ...row].map((tool, i) => (
        <LogoTile key={`${tool.slug}-${i}`} {...tool} />
      ))}
      <style jsx>{`
        @keyframes marquee-forward {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
}

export default function LogoCloud() {
  const [isPaused, setIsPaused] = useState(false);

  const rows = [
    tools.slice(0, Math.ceil(tools.length / 2)),
    tools.slice(Math.ceil(tools.length / 2)),
  ];

  return (
    <div
      className="relative overflow-hidden py-4 sm:py-6 cursor-default"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-24" />

      <div className="relative space-y-2 sm:space-y-3">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className="flex overflow-hidden">
            <MarqueeRow row={row} reverse={rowIdx === 1} isPaused={isPaused} />
          </div>
        ))}
      </div>
    </div>
  );
}
