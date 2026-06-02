'use client';

import { ExternalLink, Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SiteIcon from '@/components/SiteIcon';
import SelectDropdown from '@/components/SelectDropdown';
import { templates, type Template } from '@/data/templates';
import { techIcons, categoryIcons } from '@/data/tech-icons';

export default function TemplatesPage() {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState<string>('all');
  const [filterTech, setFilterTech] = useState<string>('all');

  const categories = useMemo(() => [...new Set(templates.map((t) => t.category))], []);
  const techs = useMemo(() => [...new Set(templates.flatMap((t) => t.tech))], []);

  const catOptions = useMemo(() => [
    { value: 'all', label: 'All Categories' },
    ...categories.map((c) => ({
      value: c,
      label: c.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      icon: categoryIcons[c]?.slug,
      iconColor: categoryIcons[c]?.color,
    })),
  ], [categories]);

  const techOptions = useMemo(() => [
    { value: 'all', label: 'All Tech' },
    ...techs.map((t) => {
      const icon = techIcons[t];
      return {
        value: t,
        label: icon?.label ?? t.toUpperCase(),
        icon: icon?.slug,
        iconColor: icon?.color ?? '888888',
      };
    }),
  ], [techs]);

  const filtered = templates.filter((t) => {
    if (filterCat !== 'all' && t.category !== filterCat) return false;
    if (filterTech !== 'all' && !t.tech.includes(filterTech)) return false;
    if (search && !t.name.toLowerCase().includes(search.toLowerCase()) && !t.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <Header />
      <main className="flex-1 pt-24">
        <section className="px-4 sm:px-6 lg:px-6 py-12">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-zinc-50 px-3.5 py-1 text-xs font-medium text-zinc-700 ring-1 ring-zinc-200/50 mb-3">
                {templates.length} Free Templates
              </div>
              <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl">Pre-built Templates</h1>
              <p className="mt-2 text-sm text-zinc-500 max-w-2xl">
                Free, ready-to-use templates for landing pages, dashboards, portfolios, and more. 
                Many include Figma design files for easy customization.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center mb-8">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
              <SelectDropdown
                options={catOptions}
                value={filterCat}
                onChange={setFilterCat}
                placeholder="All Categories"
                className="w-full sm:w-44"
              />
              <SelectDropdown
                options={techOptions}
                value={filterTech}
                onChange={setFilterTech}
                placeholder="All Tech"
                className="w-full sm:w-44"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="text-center text-sm text-zinc-400 py-12">No templates match your filters.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function TemplateCard({ template }: { template: Template }) {
  return (
    <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-zinc-200 hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-zinc-900 truncate pr-2">{template.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center rounded-full bg-zinc-50 px-2 py-0.5 text-[9px] font-medium text-zinc-600 ring-1 ring-zinc-200/50 capitalize">
              {template.category.replace('-', ' ')}
            </span>
          </div>
        </div>
        <a
          href={template.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition-all hover:bg-zinc-100 hover:text-zinc-700"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <p className="mt-2 text-xs leading-5 text-zinc-500">{template.description}</p>

      <div className="mt-3 flex flex-wrap gap-1">
        {template.tech.slice(0, 3).map((t) => {
          const icon = techIcons[t];
          return (
            <span
              key={t}
              className="inline-flex items-center gap-1 rounded-md bg-zinc-50 px-2 py-0.5 text-[9px] font-medium text-zinc-600 ring-1 ring-zinc-200/50"
            >
              <SiteIcon
                name={icon?.label || t}
                size="xs"
                fallback="hidden"
              />
              {icon?.label ?? t}
            </span>
          );
        })}
      </div>
    </div>
  );
}
