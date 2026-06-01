'use client';

import { ExternalLink, Terminal, type LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { Resource } from '@/data/resources';
import { cn } from '@/lib/utils';

function getIcon(name: string) {
  const iconMap: Record<string, string> = {
    'layout-dashboard': 'LayoutDashboard',
    'palette': 'Palette',
    'sparkles': 'Sparkles',
    'cube-3d': 'Box',
  };
  const iconName = iconMap[name] || 'Box';
  return Icons[iconName as keyof typeof Icons] as LucideIcon;
}

export default function ResourceCard({
  resource,
  gradient,
}: {
  resource: Resource;
  gradient: string;
}) {
  const installCmd = resource.installHint;

  return (
    <div className="group relative rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-zinc-200 hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm',
              gradient
            )}
          >
            <span className="text-xs font-bold uppercase">
              {resource.name.slice(0, 2)}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">{resource.name}</h3>
            <p className="text-xs text-zinc-500">{resource.category.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}</p>
          </div>
        </div>
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-all hover:bg-zinc-100 hover:text-zinc-700"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <p className="mt-3 text-xs leading-5 text-zinc-500">{resource.description}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {resource.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-md bg-zinc-50 px-2 py-0.5 text-[10px] font-medium text-zinc-600 ring-1 ring-zinc-200/50"
          >
            {tag}
          </span>
        ))}
      </div>

      {installCmd && (
        <div className="mt-4">
          <button
            onClick={() => {
              navigator.clipboard.writeText(installCmd);
            }}
            className="inline-flex w-full items-center justify-between gap-2 rounded-lg bg-zinc-50 px-3.5 py-2 text-xs font-mono text-zinc-700 transition-all hover:bg-zinc-100 ring-1 ring-zinc-200/50"
          >
            <span className="flex items-center gap-2">
              <Terminal className="h-3 w-3 text-zinc-400" />
              <span>{installCmd}</span>
            </span>
            <span className="shrink-0 text-[10px] font-medium text-zinc-400 group-hover:text-brand-500">
              Copy
            </span>
          </button>
        </div>
      )}

      <div className="absolute top-3 right-12">
        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-medium text-emerald-700 ring-1 ring-emerald-200/50">
          FREE
        </span>
      </div>
    </div>
  );
}
