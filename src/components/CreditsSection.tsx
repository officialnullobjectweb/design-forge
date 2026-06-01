'use client';

import { Heart, ExternalLink } from 'lucide-react';
import { resources } from '@/data/resources';

export default function CreditsSection() {
  return (
    <section id="credits" className="scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-rose-50 px-3.5 py-1 text-xs font-medium text-rose-700 ring-1 ring-rose-200/50">
          <Heart className="h-3 w-3" />
          Giving Credit Where It&apos;s Due
        </div>

        <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
          Built on the Shoulders of Giants
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-500">
          DesignForge doesn&apos;t host or relicense any of these resources. We simply
          curate and point to the best free tools the community has built. Every
          resource below is offered for free by its creators — please respect their
          licenses and consider supporting them.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {resources.map((r) => (
            <a
              key={r.id}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-zinc-100 bg-white px-4 py-3 text-left transition-all hover:border-zinc-200 hover:shadow-sm"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-50 text-[10px] font-bold text-zinc-700 ring-1 ring-zinc-200/50">
                {r.name.slice(0, 2)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-zinc-900 group-hover:text-brand-600 transition-colors">
                  {r.name}
                </p>
                <p className="truncate text-xs text-zinc-400">{r.url.replace('https://', '')}</p>
              </div>
              <ExternalLink className="h-3.5 w-3.5 shrink-0 text-zinc-300 group-hover:text-zinc-500 transition-colors" />
            </a>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-zinc-100 bg-zinc-50/50 px-6 py-5">
          <p className="text-xs leading-5 text-zinc-500">
            <strong className="text-zinc-700">Legal Notice:</strong> DesignForge is a curated directory.
            We do not host, distribute, or modify any of the listed tools. All trademarks,
            logos, and brand names belong to their respective owners. Each resource is used
            under its respective license (MIT, Apache 2.0, CC0, or similar open-source/free
            license). If you are a creator of a listed resource and wish to have it removed,
            please open an issue on our GitHub repository.
          </p>
        </div>
      </div>
    </section>
  );
}
