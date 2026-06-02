'use client'

import { useState } from 'react'
import { ExternalLink, Search, ChevronDown, ChevronRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SiteIcon from '@/components/SiteIcon'
import { resources } from '@/data/resources'
import { categories } from '@/data/categories'
import { brandIcons } from '@/lib/resource-icons'

const resourcesByCategory: Record<string, typeof resources> = {}
for (const cat of categories) {
  resourcesByCategory[cat.id] = resources
    .filter(r => r.category === cat.id)
    .sort((a, b) => {
      const aHas = a.id in brandIcons ? 1 : 0
      const bHas = b.id in brandIcons ? 1 : 0
      if (aHas !== bHas) return bHas - aHas
      return a.name.localeCompare(b.name)
    })
}

export default function CreditsPage() {
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<Set<string>>(new Set(categories.map(c => c.id)))

  const toggleCat = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }

  const q = search.toLowerCase()
  const visibleCats = categories.filter(cat => {
    const catRes = resourcesByCategory[cat.id] || []
    if (!q) return catRes.length > 0
    return catRes.some(r => r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q))
  })

  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <section className="px-4 sm:px-6 lg:px-6 py-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1 text-xs font-medium text-brand-700 ring-1 ring-brand-200/50 mb-3">
                Credits
              </div>
              <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl">
                All Resources &amp; Tools
              </h1>
              <p className="mt-2 text-sm text-zinc-500 max-w-2xl">
                Every free tool and resource aggregated in DesignForge. All belong to their respective creators.
              </p>
            </div>

            <div className="relative mb-6 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>

            <div className="space-y-4">
              {visibleCats.map(cat => {
                const catRes = resourcesByCategory[cat.id] || []
                const matched = q ? catRes.filter(r => r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)) : catRes
                if (matched.length === 0) return null
                const isExpanded = expanded.has(cat.id)

                return (
                  <div key={cat.id} className="rounded-2xl border border-zinc-100 bg-white overflow-hidden">
                    <button
                      onClick={() => toggleCat(cat.id)}
                      className="flex items-center gap-2 w-full px-4 py-3 hover:bg-zinc-50 transition-colors"
                    >
                      {isExpanded ? <ChevronDown className="h-4 w-4 text-zinc-400" /> : <ChevronRight className="h-4 w-4 text-zinc-400" />}
                      <span className="text-sm font-semibold text-zinc-800 flex-1">{cat.label}</span>
                      <span className="text-xs text-zinc-400 bg-zinc-50 rounded-full px-2 py-0.5">{matched.length}</span>
                    </button>

                    {isExpanded && (
                      <div className="border-t border-zinc-50">
                        {matched.map(r => (
                          <a
                            key={r.id}
                            href={r.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-50 transition-colors border-b border-zinc-50 last:border-0"
                          >
                            <SiteIcon resourceId={r.id} name={r.name} url={r.url} size="sm" />
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-medium text-zinc-800 truncate">{r.name}</div>
                              <div className="text-xs text-zinc-400 truncate mt-0.5">{r.description}</div>
                            </div>
                            <ExternalLink className="h-3.5 w-3.5 shrink-0 text-zinc-300" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {visibleCats.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-sm text-zinc-500">No resources match your search.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
