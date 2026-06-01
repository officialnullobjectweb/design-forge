'use client';

import { GitFork, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-100 bg-zinc-50/50 px-4 py-12 sm:px-6 lg:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-xs font-bold tracking-tight text-zinc-700">
              Design<span className="text-brand-600">Forge</span>
            </span>
          </div>

          <p className="flex items-center gap-1 text-xs text-zinc-400">
            Built with
            <Heart className="h-3 w-3 text-rose-400 fill-rose-400" />
            for the open-source community
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/officialnullobjectweb/design-forge"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-zinc-400 transition-colors hover:text-zinc-700"
            >
              <GitFork className="h-3.5 w-3.5" />
              GitHub
            </a>
            <a
              href="#resources"
              className="text-xs text-zinc-400 transition-colors hover:text-zinc-700"
            >
              Resources
            </a>
            <a
              href="#credits"
              className="text-xs text-zinc-400 transition-colors hover:text-zinc-700"
            >
              Credits
            </a>
          </div>
        </div>
        <p className="mt-6 text-center text-[10px] text-zinc-300">
          © {new Date().getFullYear()} DesignForge. All resources belong to their respective
          creators. This is a free curation project.
        </p>
      </div>
    </footer>
  );
}
