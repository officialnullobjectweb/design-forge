'use client';

import { ExternalLink, Search } from 'lucide-react';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { templates, type Template } from '@/data/templates';
import { cn } from '@/lib/utils';

const categories = [...new Set(templates.map((t) => t.category))];
const techs = [...new Set(templates.flatMap((t) => t.tech))];

export default function TemplatesPage() {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState<string>('all');
  const [filterTech, setFilterTech] = useState<string>('all');

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
        <section className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="mx-auto max-w-7xl">
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
              <select
                value={filterCat}
                onChange={(e) => setFilterCat(e.target.value)}
                className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
                ))}
              </select>
              <select
                value={filterTech}
                onChange={(e) => setFilterTech(e.target.value)}
                className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              >
                <option value="all">All Tech</option>
                {techs.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
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
    <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-zinc-200">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900">{template.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center rounded-full bg-zinc-50 px-2 py-0.5 text-[9px] font-medium text-zinc-600 ring-1 ring-zinc-200/50 capitalize">
              {template.category.replace('-', ' ')}
            </span>
            <span className={cn(
              'inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-medium',
              template.difficulty === 'beginner' && 'bg-green-50 text-green-700 ring-1 ring-green-200/50',
              template.difficulty === 'intermediate' && 'bg-amber-50 text-amber-700 ring-1 ring-amber-200/50',
              template.difficulty === 'advanced' && 'bg-red-50 text-red-700 ring-1 ring-red-200/50',
            )}>
              {template.difficulty}
            </span>
          </div>
        </div>
        <a
          href={template.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-all"
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <p className="mt-2.5 text-xs leading-5 text-zinc-500">{template.description}</p>

      {template.includesDesignFile && (
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1.5 text-[10px] font-medium text-blue-700 ring-1 ring-blue-200/50">
          Includes {template.designFileType?.toUpperCase()} design file
        </div>
      )}

      <div className="mt-3 flex flex-wrap gap-1">
        {template.tech.map((t) => (
          <span key={t} className="inline-flex items-center rounded-md bg-zinc-50 px-2 py-0.5 text-[9px] font-medium text-zinc-600 ring-1 ring-zinc-200/50">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <a
          href={template.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-medium text-brand-600 hover:text-brand-700 transition-colors"
        >
          View template →
        </a>
        <span className="text-[9px] text-zinc-400">
          {template.source.replace(/-/g, ' ')}
        </span>
      </div>
    </div>
  );
}
