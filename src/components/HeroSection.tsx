'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Wand2, Terminal, Package, Sparkles } from 'lucide-react';
import LogoCloud from './LogoCloud';

const stats = [
  { number: '100+', label: 'Free Packages' },
  { number: '1', label: 'Command to Start' },
  { number: 'Zero', label: 'Bloat' },
  { number: '5min', label: 'To First Build' },
];

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 1, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pt-28 pb-16 sm:px-6 sm:pt-36 lg:px-6">
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-[-20%] left-[-10%] h-[70%] w-[60%] rounded-full bg-gradient-to-br from-violet-300/25 via-violet-400/15 to-transparent blur-3xl"
          animate={{
            x: [0, 40, -30, 20, 0],
            y: [0, -30, 20, -10, 0],
            scale: [1, 1.08, 0.95, 1.05, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[-20%] right-[-10%] h-[60%] w-[55%] rounded-full bg-gradient-to-bl from-emerald-200/25 via-teal-300/15 to-transparent blur-3xl"
          animate={{
            x: [0, -50, 30, -20, 0],
            y: [0, 40, -20, 30, 0],
            scale: [1, 1.12, 0.98, 1.06, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[35%] right-[15%] h-[35%] w-[30%] rounded-full bg-gradient-to-r from-amber-200/15 via-orange-300/10 to-transparent blur-3xl"
          animate={{
            x: [0, 30, -40, 15, 0],
            y: [0, -20, 35, -15, 0],
            scale: [1, 1.15, 0.92, 1.08, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[10%] right-[30%] h-[20%] w-[20%] rounded-full bg-gradient-to-tr from-violet-200/20 via-fuchsia-300/10 to-transparent blur-3xl"
          animate={{
            x: [0, -25, 35, -15, 0],
            y: [0, 25, -15, 20, 0],
            scale: [1, 0.9, 1.1, 0.95, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[30%] left-[20%] h-[25%] w-[25%] rounded-full bg-gradient-to-tr from-emerald-200/15 via-cyan-300/10 to-transparent blur-3xl"
          animate={{
            x: [0, 35, -25, 20, 0],
            y: [0, -35, 20, -25, 0],
            scale: [1, 1.05, 0.9, 1.1, 1],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[50%] left-[40%] h-[15%] w-[15%] rounded-full bg-gradient-to-r from-violet-300/15 via-purple-400/10 to-transparent blur-3xl"
          animate={{
            x: [0, -20, 25, -10, 0],
            y: [0, 15, -25, 10, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-50 via-white to-zinc-50/50" />
      </div>

      <motion.div
        className="mx-auto max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200/60 bg-violet-50/80 px-4 py-1.5 text-xs font-medium text-violet-700 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"
                animate={{ scale: [1, 1.8], opacity: [0.75, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
            </span>
            AI Agent Toolkit &middot; Zero Bloat &middot; 100% Free
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center">
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-zinc-900 sm:text-5xl md:text-6xl lg:text-7xl">
            Tell Your AI Agent{' '}
            <span className="bg-gradient-to-r from-violet-600 via-violet-500 to-emerald-500 bg-clip-text text-transparent">
              What to Build
            </span>
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl">We Install Only What You Need.</span>
          </h1>
        </motion.div>

        <motion.div variants={itemVariants} className="mx-auto mt-6 max-w-2xl text-center">
          <p className="text-base leading-7 text-zinc-500 sm:text-lg sm:leading-8">
            A single NPM command. Your AI agent describes the output — Numb.Design picks the exact
            packages, nothing more. No bloat, no conflicts, no unused dependencies.
          </p>
          <p className="mt-1 text-sm text-zinc-400">
            Change your mind? We clean up the old packages too.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <motion.a
            href="/wizard"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-zinc-900 px-7 text-sm font-medium text-white shadow-lg shadow-zinc-900/20 transition-all hover:bg-zinc-800 hover:shadow-xl active:scale-[0.98]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Wand2 className="h-4 w-4" />
            Try the Wizard
            <ArrowDown className="h-3.5 w-3.5" />
          </motion.a>
          <motion.a
            href="#resources"
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-7 text-sm font-medium text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 hover:shadow-md"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Package className="h-4 w-4" />
            Browse Packages
          </motion.a>
          <motion.a
            href="https://www.npmjs.com/package/numb-design"
            target="_blank"
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-7 text-sm font-medium text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 hover:shadow-md"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Terminal className="h-4 w-4" />
            npx design-forge-cli
          </motion.a>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="rounded-xl border border-zinc-100 bg-white/60 px-3 py-4 text-center backdrop-blur-sm"
              whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
            >
              <div className="text-xl font-bold text-zinc-900 sm:text-2xl">{stat.number}</div>
              <div className="mt-0.5 text-[10px] font-medium text-zinc-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="mx-auto mt-16 max-w-5xl"
        initial={{ opacity: 1, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-zinc-50 px-4 py-1.5 text-xs font-medium text-zinc-500 ring-1 ring-zinc-200/50">
            <Sparkles className="h-3 w-3 text-violet-500" />
            Powered by these tools
          </div>
        </div>
        <LogoCloud />
      </motion.div>
    </section>
  );
}
