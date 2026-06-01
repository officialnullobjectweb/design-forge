'use client';

import { useState, useMemo } from 'react';
import { Search, ExternalLink, Package } from 'lucide-react';
import { resources } from '@/data/resources';
import { categories, type ResourceCategory } from '@/data/categories';
import { brandIcons, getResourceIconUrl } from '@/lib/resource-icons';

const allCategory = '__all__';

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState<string>(allCategory);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const matchCategory = activeCategory === allCategory || r.category === activeCategory;
      const matchSearch = !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-zinc-100">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-6">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-zinc-50 px-3.5 py-1 text-xs font-medium text-zinc-700 ring-1 ring-zinc-200/50">
            <Package className="h-3 w-3" /> {resources.length} packages
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Browse All Packages
          </h1>
          <p className="mt-2 text-sm text-zinc-500 max-w-2xl">
            Every package DesignForge knows about — UI components, icons, animations, fonts, colors, and more. All free, all installable via your AI agent.
          </p>
        </div>
      </div>

      <div className="sticky top-16 z-20 border-b border-zinc-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-6">
          <div className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search packages…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white py-2 pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
              />
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
            <button
              onClick={() => setActiveCategory(allCategory)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                activeCategory === allCategory
                  ? 'bg-zinc-900 text-white'
                  : 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100 ring-1 ring-zinc-200/50'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-zinc-900 text-white'
                    : 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100 ring-1 ring-zinc-200/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((resource) => (
            <ResourceRow key={resource.id} resource={resource} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm text-zinc-400">No packages match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ResourceRow({ resource }: { resource: { id: string; name: string; description: string; url: string; category: ResourceCategory } }) {
  const [imgFailed, setImgFailed] = useState(false);
  const brand = brandIcons[resource.id];
  const categoryInfo = categories.find((c) => c.id === resource.category);

  const imgSrc = brand
    ? `https://cdn.simpleicons.org/${brand.slug}/${brand.color}`
    : getResourceIconUrl(resource.url, resource.name);

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-xl border border-zinc-100 bg-white px-4 py-3 transition-all hover:shadow-sm hover:border-zinc-200"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-50 ring-1 ring-zinc-200/50 overflow-hidden">
        {!imgFailed ? (
          <img
            src={imgSrc}
            alt={resource.name}
            className="h-4 w-4 object-contain"
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="text-[9px] font-bold text-zinc-500 uppercase">
            {resource.name.slice(0, 2)}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-zinc-900 truncate">{resource.name}</span>
          {categoryInfo && (
            <span className="shrink-0 rounded-full bg-zinc-50 px-2 py-0.5 text-[10px] font-medium text-zinc-500 ring-1 ring-zinc-200/50">
              {categoryInfo.label}
            </span>
          )}
        </div>
        <p className="text-xs text-zinc-400 truncate">{resource.description}</p>
      </div>
      <ExternalLink className="h-3.5 w-3.5 shrink-0 text-zinc-300 transition-colors group-hover:text-zinc-500" />
    </a>
  );
}
