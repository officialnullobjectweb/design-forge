'use client';

import { ExternalLink, Terminal } from 'lucide-react';
import type { Resource } from '@/data/categories';
import { cn } from '@/lib/utils';

export default function ResourceCard({
  resource,
  gradient,
}: {
  resource: Resource;
  gradient: string;
}) {
  const installCmd = resource.installHint;

  return (
    <div className="group relative rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-zinc-200 hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm',
              gradient
            )}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {resource.name.slice(0, 2)}
            </span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-zinc-900 truncate">{resource.name}</h3>
              {resource.size && (
                <span className={cn(
                  'inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-medium',
                  resource.size === 'tiny' && 'bg-green-50 text-green-700 ring-1 ring-green-200/50',
                  resource.size === 'small' && 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/50',
                  resource.size === 'medium' && 'bg-amber-50 text-amber-700 ring-1 ring-amber-200/50',
                  resource.size === 'large' && 'bg-red-50 text-red-700 ring-1 ring-red-200/50',
                )}>
                  {resource.size}
                </span>
              )}
            </div>
            <span className="text-[10px] text-zinc-400 capitalize">{resource.type}</span>
          </div>
        </div>
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition-all hover:bg-zinc-100 hover:text-zinc-700"
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <p className="mt-2.5 text-xs leading-5 text-zinc-500 line-clamp-2">{resource.description}</p>

      <div className="mt-3 flex flex-wrap gap-1">
        {resource.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-md bg-zinc-50 px-2 py-0.5 text-[9px] font-medium text-zinc-600 ring-1 ring-zinc-200/50"
          >
            {tag}
          </span>
        ))}
        {resource.tags.length > 4 && (
          <span className="inline-flex items-center rounded-md bg-zinc-50 px-2 py-0.5 text-[9px] font-medium text-zinc-400 ring-1 ring-zinc-200/50">
            +{resource.tags.length - 4}
          </span>
        )}
      </div>

      {installCmd && (
        <div className="mt-3">
          <button
            onClick={() => navigator.clipboard.writeText(installCmd)}
            className="inline-flex w-full items-center justify-between gap-2 rounded-lg bg-zinc-50 px-3 py-2 text-xs font-mono text-zinc-700 transition-all hover:bg-zinc-100 ring-1 ring-zinc-200/50"
          >
            <span className="flex items-center gap-2 min-w-0">
              <Terminal className="h-3 w-3 shrink-0 text-zinc-400" />
              <span className="truncate">{installCmd}</span>
            </span>
            <span className="shrink-0 text-[9px] font-medium text-zinc-400 group-hover:text-brand-500">
              Copy
            </span>
          </button>
        </div>
      )}

      {resource.cdnAvailable && (
        <div className="absolute top-2.5 right-10">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[8px] font-medium text-blue-700 ring-1 ring-blue-200/50">
            CDN
          </span>
        </div>
      )}
      <div className="absolute top-2.5 right-2.5">
        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[8px] font-medium text-emerald-700 ring-1 ring-emerald-200/50">
          FREE
        </span>
      </div>
    </div>
  );
}
