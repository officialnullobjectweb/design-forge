'use client';

import { motion } from 'framer-motion';

const builtWith = [
  { name: 'Next.js', slug: 'nextdotjs', color: '000000', url: 'https://nextjs.org', desc: 'React framework' },
  { name: 'Framer Motion', slug: 'framer', color: '0055FF', url: 'https://motion.dev', desc: 'Animation library' },
  { name: 'Tailwind CSS', slug: 'tailwindcss', color: '06B6D4', url: 'https://tailwindcss.com', desc: 'Utility-first CSS' },
  { name: 'shadcn/ui', slug: 'shadcnui', color: '000000', url: 'https://ui.shadcn.com', desc: 'UI components' },
  { name: 'Geist Font', slug: 'geist', color: '000000', url: 'https://vercel.com/font', desc: 'Typography' },
  { name: 'Lucide', slug: 'lucide', color: 'F56565', url: 'https://lucide.dev', desc: 'Icons' },
  { name: 'Simple Icons', slug: 'simpleicons', color: '111111', url: 'https://simpleicons.org', desc: 'Brand icons' },
  { name: 'Radix UI', slug: 'radixui', color: 'FF5A5F', url: 'https://radix-ui.com', desc: 'Headless primitives' },
];

export default function CreditsSection() {
  return (
    <section id="credits" className="scroll-mt-24 px-4 py-24 sm:px-6 lg:px-6">
      <motion.div
        className="mx-auto max-w-4xl text-center"
        initial={{ opacity: 1, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-rose-50 px-3.5 py-1 text-xs font-medium text-rose-700 ring-1 ring-rose-200/50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          Built With
        </div>

        <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
          Powered by Open Source
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-500">
          Numb.Design is built entirely on free and open-source tools. 
          Each one made this possible — please support them.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {builtWith.map((tool, idx) => (
            <motion.a
              key={tool.slug}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 1, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.06, ease: 'easeOut' }}
              className="group flex items-center gap-3 rounded-xl border border-zinc-100 bg-white px-4 py-3.5 text-left transition-all hover:border-zinc-200 hover:shadow-md hover:-translate-y-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-50 ring-1 ring-zinc-200/50">
                <img
                  src={`https://cdn.simpleicons.org/${tool.slug}/${tool.color}`}
                  alt={tool.name}
                  className="h-5 w-5"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-zinc-900 group-hover:text-brand-600 transition-colors">
                  {tool.name}
                </p>
                <p className="truncate text-xs text-zinc-400">{tool.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-zinc-100 bg-zinc-50/50 px-6 py-5">
          <p className="text-xs leading-5 text-zinc-500">
            <strong className="text-zinc-700">Legal Notice:</strong> Numb.Design does not host, distribute, or modify any
            of the listed tools. All trademarks, logos, and brand names belong to their respective owners.
            Each resource is used under its respective open-source license. If you are a creator of a listed
            resource and wish to have it removed, please open an issue on our GitHub repository.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
