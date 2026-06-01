'use client';

import { ExternalLink, Search } from 'lucide-react';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { skills } from '@/data/skills';
import { cn } from '@/lib/utils';

const categories = [...new Set(skills.map((s) => s.category))];
const types = [...new Set(skills.map((s) => s.type))];

export default function SkillsPage() {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const filtered = skills.filter((s) => {
    if (filterCat !== 'all' && s.category !== filterCat) return false;
    if (filterType !== 'all' && s.type !== filterType) return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.description.toLowerCase().includes(search.toLowerCase())) return false;
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
                {skills.length} Design Skills
              </div>
              <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl">Design Skills & Knowledge</h1>
              <p className="mt-2 text-sm text-zinc-500 max-w-2xl">
                Free guides, cheatsheets, and references to level up your design skills. 
                From color theory to accessibility, layout to design systems.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center mb-8">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search skills..."
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
                  <option key={c} value={c}>{c.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
                ))}
              </select>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              >
                <option value="all">All Types</option>
                {types.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((skill) => (
                <div key={skill.id} className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-zinc-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900">{skill.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center rounded-full bg-zinc-50 px-2 py-0.5 text-[9px] font-medium text-zinc-600 ring-1 ring-zinc-200/50 capitalize">
                          {skill.category.replace(/-/g, ' ')}
                        </span>
                        <span className={cn(
                          'inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-medium',
                          skill.difficulty === 'beginner' && 'bg-green-50 text-green-700 ring-1 ring-green-200/50',
                          skill.difficulty === 'intermediate' && 'bg-amber-50 text-amber-700 ring-1 ring-amber-200/50',
                          skill.difficulty === 'advanced' && 'bg-red-50 text-red-700 ring-1 ring-red-200/50',
                        )}>
                          {skill.difficulty}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-purple-50 px-2 py-0.5 text-[9px] font-medium text-purple-700 ring-1 ring-purple-200/50 capitalize">
                          {skill.type}
                        </span>
                      </div>
                    </div>
                    <a
                      href={skill.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-all"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>

                  <p className="mt-2.5 text-xs leading-5 text-zinc-500">{skill.description}</p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {skill.tags.map((t) => (
                      <span key={t} className="inline-flex items-center rounded-md bg-zinc-50 px-2 py-0.5 text-[9px] font-medium text-zinc-600 ring-1 ring-zinc-200/50">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="text-center text-sm text-zinc-400 py-12">No skills match your filters.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
