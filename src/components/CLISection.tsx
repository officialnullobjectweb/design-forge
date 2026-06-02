'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Copy, Check, ArrowRight, Globe, Package, Download } from 'lucide-react';

interface Line {
  text: string;
  type: 'output' | 'success';
  delay: number;
}

const terminalLines: Line[] = [
  { text: 'design-forge-cli@latest ready', type: 'output', delay: 500 },
  { text: 'Detecting project structure...', type: 'output', delay: 1200 },
  { text: '✓ Found package.json (React + Tailwind)', type: 'success', delay: 2200 },
  { text: 'Installing design resources...', type: 'output', delay: 3000 },
  { text: '✓ shadcn/ui configured', type: 'success', delay: 3800 },
  { text: '✓ lucide-react + tabler-icons installed', type: 'success', delay: 4400 },
  { text: '✓ framer-motion added', type: 'success', delay: 5000 },
  { text: '✓ daisyUI plugin registered in tailwind.config', type: 'success', delay: 5600 },
  { text: '✓ 3/3 templates applied', type: 'success', delay: 6200 },
  { text: '', type: 'output', delay: 6500 },
  { text: 'Ready! Run `npm run dev` to start.', type: 'success', delay: 6800 },
];

const commands = [
  {
    label: 'Install CLI Tool',
    cmd: 'npx design-forge-cli init',
    desc: 'Interactive setup for your project',
  },
  {
    label: 'Quick Resource Install',
    cmd: 'npx design-forge-cli add shadcn-ui lucide framer-motion',
    desc: 'Install multiple resources at once',
  },
  {
    label: 'Apply Template',
    cmd: 'npx design-forge-cli template landing-page',
    desc: 'Scaffold a pre-built template',
  },
  {
    label: 'Search Resources',
    cmd: 'npx design-forge-cli search buttons',
    desc: 'Find resources from the terminal',
  },
];

export default function CLISection() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  useEffect(() => {
    if (visibleLines >= terminalLines.length) return;
    const line = terminalLines[visibleLines];
    const timer = setTimeout(() => setVisibleLines((v) => v + 1), line.delay);
    return () => clearTimeout(timer);
  }, [visibleLines]);

  return (
    <section id="cli" className="scroll-mt-24 px-4 py-24 sm:px-6 lg:px-6">
      <motion.div
        className="mx-auto max-w-5xl"
        initial={{ opacity: 1, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3.5 py-1 text-xs font-medium text-violet-700 ring-1 ring-violet-200/50"
            initial={{ opacity: 1, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Terminal className="h-3 w-3" />
            CLI & Package Manager
          </motion.div>
          <motion.h2
            className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl"
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            One Command to Start
          </motion.h2>
          <motion.p
            className="mt-3 text-sm text-zinc-500"
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Install everything you need with a single npx command. No config chasing, no dependency hell.
          </motion.p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <motion.div
            className="rounded-2xl border border-zinc-200 bg-zinc-950 shadow-xl overflow-hidden"
            initial={{ opacity: 1, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <span className="ml-2 text-xs font-mono text-zinc-500">design-forge — bash</span>
            </div>

            <div className="p-5 font-mono text-sm leading-6">
              <div className="flex items-center gap-2 text-zinc-500">
                <span className="text-emerald-400">$</span>
                <span className="animate-pulse">npx design-forge-cli init</span>
              </div>

              <div className="mt-3 space-y-1">
                {terminalLines.slice(0, visibleLines).map((line, i) => {
                  if (!line.text) return <div key={i} className="h-2" />;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={line.type === 'success' ? 'text-emerald-400' : 'text-zinc-400'}
                    >
                      {line.type === 'success' ? (
                        <span className="inline-flex items-center gap-2">
                          <Check className="h-3.5 w-3.5" />
                          {line.text}
                        </span>
                      ) : (
                        line.text
                      )}
                    </motion.div>
                  );
                })}
                {visibleLines < terminalLines.length && (
                  <span className="inline-block h-4 w-2 bg-zinc-300 animate-pulse ml-1" />
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 1, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="rounded-xl border border-zinc-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
                  <Package className="h-5 w-5 text-violet-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900">design-forge-cli</h3>
                  <p className="text-xs text-zinc-500">v1.0.0 &middot; Published on npm</p>
                </div>
                <motion.a
                  href="https://www.npmjs.com/package/design-forge-cli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3.5 py-2 text-xs font-medium text-white transition-all hover:bg-zinc-800"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Globe className="h-3.5 w-3.5" />
                  npm
                </motion.a>
              </div>
            </div>

            {commands.map((cmd, i) => (
              <motion.div
                key={cmd.label}
                className="group flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 py-3.5 transition-all hover:border-violet-200 hover:shadow-sm"
                initial={{ opacity: 1, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-[10px] font-mono font-bold text-zinc-400 group-hover:bg-violet-100 group-hover:text-violet-600 transition-colors">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-zinc-900">{cmd.label}</p>
                    <code className="mt-0.5 block truncate text-xs font-mono text-zinc-500">
                      {cmd.cmd}
                    </code>
                    <p className="mt-0.5 text-[10px] text-zinc-400">{cmd.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(cmd.cmd, cmd.label)}
                  className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition-all hover:bg-zinc-100 hover:text-zinc-700"
                >
                  {copied === cmd.label ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </motion.div>
            ))}

            <motion.a
              href="https://github.com/officialnullobjectweb/design-forge"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-700 transition-all hover:bg-zinc-50 hover:shadow-sm"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="h-4 w-4" />
              View on GitHub
              <ArrowRight className="h-3.5 w-3.5" />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
