'use client';

import type { CategoryInfo, Resource } from '@/data/categories';
import ResourceCard from './ResourceCard';
import { brandIcons } from '@/lib/resource-icons';

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
  const sorted = sortResources(resources);

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
          {sorted.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
