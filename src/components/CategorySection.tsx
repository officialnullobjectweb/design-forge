'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { CategoryInfo, Resource } from '@/data/categories';
import ResourceCard from './ResourceCard';
import { brandIcons } from '@/lib/resource-icons';

const INITIAL_VISIBLE = 4;

function sortResources(resources: Resource[]): Resource[] {
  return [...resources].sort((a, b) => {
    const aHasLogo = a.id in brandIcons ? 1 : 0;
    const bHasLogo = b.id in brandIcons ? 1 : 0;
    if (aHasLogo !== bHasLogo) return bHasLogo - aHasLogo;
    return a.name.localeCompare(b.name);
  });
}

export default function CategorySection({
  category,
  resources,
}: {
  category: CategoryInfo;
  resources: Resource[];
}) {
  const [showAll, setShowAll] = useState(false);
  const sorted = sortResources(resources);
  const visible = showAll ? sorted : sorted.slice(0, INITIAL_VISIBLE);
  const hasMore = sorted.length > INITIAL_VISIBLE;

  return (
    <section id={category.id} className="scroll-mt-24 px-4 sm:px-6 lg:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-zinc-50 px-3.5 py-1 text-xs font-medium text-zinc-700 ring-1 ring-zinc-200/50">
            {resources.length} packages
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            {category.label}
          </h2>
          <p className="mt-2 text-sm text-zinc-500 max-w-2xl">
            {category.description}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
            />
          ))}
        </div>

        {hasMore && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-600 shadow-sm transition-all hover:bg-zinc-50 hover:shadow-md hover:text-zinc-900"
            >
              {showAll ? (
                <>Show less <ChevronUp className="h-4 w-4" /></>
              ) : (
                <>Show all {sorted.length} packages <ChevronDown className="h-4 w-4" /></>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
