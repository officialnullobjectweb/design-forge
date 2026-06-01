'use client';

import type { CategoryInfo, Resource } from '@/data/resources';
import ResourceCard from './ResourceCard';

export default function CategorySection({
  category,
  resources,
}: {
  category: CategoryInfo;
  resources: Resource[];
}) {
  return (
    <section id={category.id} className="scroll-mt-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-zinc-50 px-3.5 py-1 text-xs font-medium text-zinc-700 ring-1 ring-zinc-200/50">
            {category.label}
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
            {category.label}
          </h2>
          <p className="mt-2 text-sm text-zinc-500 max-w-2xl">
            {category.description}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              gradient={category.gradient}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
