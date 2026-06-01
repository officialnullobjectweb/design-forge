'use client';

import { ExternalLink, Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SelectDropdown from '@/components/SelectDropdown';
import { skills } from '@/data/skills';
import { categoryIcons, typeIcons } from '@/data/tech-icons';
import { cn } from '@/lib/utils';

export default function SkillsPage() {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const categories = useMemo(() => [...new Set(skills.map((s) => s.category))], []);
  const types = useMemo(() => [...new Set(skills.map((s) => s.type))], []);

  const catOptions = useMemo(() => [
    { value: 'all', label: 'All Categories' },
    ...categories.map((c) => ({
      value: c,
      label: c.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      icon: categoryIcons[c]?.slug,
      iconColor: categoryIcons[c]?.color,
    })),
  ], [categories]);

  const typeOptions = useMemo(() => [
    { value: 'all', label: 'All Types' },
    ...types.map((t) => ({
      value: t,
      label: t.charAt(0).toUpperCase() + t.slice(1),
      icon: typeIcons[t]?.slug,
      iconColor: typeIcons[t]?.color,
    })),
  ], [types]);

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
        <section className="px-4 sm:px-6 lg:px-6 py-12">
          <div className="mx-auto max-w-6xl">
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
              <SelectDropdown
                options={catOptions}
                value={filterCat}
                onChange={setFilterCat}
                placeholder="All Categories"
                className="w-full sm:w-44"
              />
              <SelectDropdown
                options={typeOptions}
                value={filterType}
                onChange={setFilterType}
                placeholder="All Types"
                className="w-full sm:w-44"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((skill) => (
                <div key={skill.id} className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-zinc-200 hover:-translate-y-0.5">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-zinc-900 truncate pr-2">{skill.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2 py-0.5 text-[9px] font-medium text-purple-700 ring-1 ring-purple-200/50 capitalize">
                          {typeIcons[skill.type] && (
                            <img
                              src={`https://cdn.simpleicons.org/${typeIcons[skill.type].slug}/888888`}
                              alt=""
                              className="h-3 w-3"
                            />
                          )}
                          {skill.type}
                        </span>
                      </div>
                    </div>
                    <a
                      href={skill.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition-all hover:bg-zinc-100 hover:text-zinc-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-zinc-500">{skill.description}</p>
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
