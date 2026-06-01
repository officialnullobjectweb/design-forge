'use client';

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import type { Resource } from '@/data/categories';
import { brandIcons, getResourceIconUrl } from '@/lib/resource-icons';

export default function ResourceCard({
  resource,
}: {
  resource: Resource;
}) {
  const brand = brandIcons[resource.id];
  const [useLevel, setUseLevel] = useState(0);

  const levels = [
    brand ? `https://cdn.simpleicons.org/${brand.slug}/${brand.color}` : null,
    getResourceIconUrl(resource.url, resource.name),
  ].filter(Boolean) as string[];

  const currentSrc = useLevel < levels.length ? levels[useLevel] : null;

  return (
    <div className="group relative rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-zinc-200 hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-50 ring-1 ring-zinc-200/50 overflow-hidden">
            {currentSrc ? (
              <img
                src={currentSrc}
                alt={resource.name}
                className="h-5 w-5 object-contain"
                loading="lazy"
                onError={() => setUseLevel(p => p + 1)}
              />
            ) : (
              <span className="text-[10px] font-bold text-zinc-500 uppercase">
                {resource.name.slice(0, 2)}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-zinc-900 truncate">{resource.name}</h3>
          </div>
        </div>
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition-all hover:bg-zinc-100 hover:text-zinc-700"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <p className="mt-2 text-xs leading-5 text-zinc-500">{resource.description}</p>

      {resource.installHint && (
        <div className="mt-2">
          <span className="inline-flex items-center rounded-md bg-zinc-50 px-2.5 py-1 text-[10px] font-mono text-zinc-600 ring-1 ring-zinc-200/50 truncate block w-full">
            {resource.installHint}
          </span>
        </div>
      )}
    </div>
  );
}
