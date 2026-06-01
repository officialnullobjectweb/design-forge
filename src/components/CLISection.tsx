'use client';

import { Terminal, Copy, Check, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const commands = [
  {
    label: 'Quick Setup (All Resources)',
    cmd: 'bash <(curl -sL https://design-forge.vercel.app/cli/setup.sh)',
  },
  {
    label: 'Init shadcn/ui + Tailwind',
    cmd: 'npx shadcn@latest init',
  },
  {
    label: 'Install Animations',
    cmd: 'npm install framer-motion @formkit/auto-animate',
  },
  {
    label: 'Install Icons',
    cmd: 'npm install lucide-react @tabler/icons-react @heroicons/react',
  },
];

export default function CLISection() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="cli" className="scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 p-8 shadow-2xl sm:p-12">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <Terminal className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white sm:text-2xl">
                One-Command Setup
              </h2>
              <p className="text-sm text-zinc-400">
                Copy, paste, and you&apos;re ready to build
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            {commands.map((item, i) => (
              <div
                key={i}
                className="group flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 transition-all hover:bg-white/10"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="hidden sm:flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-[10px] font-mono font-medium text-zinc-400">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-zinc-300">{item.label}</p>
                    <code className="mt-0.5 block truncate text-xs font-mono text-zinc-500">
                      {item.cmd}
                    </code>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(item.cmd, i)}
                  className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition-all hover:bg-white/10 hover:text-white"
                >
                  {copiedIndex === i ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-white">Want the full CLI tool?</p>
              <p className="text-xs text-zinc-400">
                Run our setup script to install everything at once
              </p>
            </div>
            <a
              href="https://github.com/officialnullobjectweb/design-forge"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-white px-4 text-xs font-medium text-zinc-900 transition-all hover:bg-zinc-100"
            >
              View on GitHub
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
