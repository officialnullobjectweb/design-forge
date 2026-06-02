'use client';

import { motion } from 'framer-motion';

const blobs = [
  {
    className: 'w-[80%] h-[80%] top-[-20%] left-[-15%]',
    bg: 'bg-gradient-to-br from-violet-500/25 via-violet-600/15 to-transparent',
    x: [0, 80, -50, 40, 0],
    y: [0, -50, 40, -30, 0],
    scale: [1, 1.12, 0.92, 1.06, 1],
    duration: 24,
  },
  {
    className: 'w-[70%] h-[70%] bottom-[-22%] right-[-15%]',
    bg: 'bg-gradient-to-bl from-emerald-400/25 via-teal-500/15 to-transparent',
    x: [0, -90, 50, -40, 0],
    y: [0, 60, -40, 50, 0],
    scale: [1, 1.15, 0.9, 1.08, 1],
    duration: 28,
  },
  {
    className: 'w-[50%] h-[50%] top-[20%] right-[5%]',
    bg: 'bg-gradient-to-r from-amber-400/20 via-orange-500/12 to-transparent',
    x: [0, 55, -65, 30, 0],
    y: [0, -40, 55, -25, 0],
    scale: [1, 1.18, 0.88, 1.1, 1],
    duration: 32,
  },
  {
    className: 'w-[45%] h-[45%] bottom-[25%] left-[8%]',
    bg: 'bg-gradient-to-tr from-fuchsia-400/20 via-purple-500/12 to-transparent',
    x: [0, -45, 60, -25, 0],
    y: [0, 40, -35, 45, 0],
    scale: [1, 0.9, 1.12, 0.95, 1],
    duration: 26,
  },
  {
    className: 'w-[35%] h-[35%] top-[8%] left-[30%]',
    bg: 'bg-gradient-to-t from-violet-400/18 via-indigo-500/10 to-transparent',
    x: [0, 40, -30, 50, 0],
    y: [0, -35, 45, -20, 0],
    scale: [1, 1.1, 0.93, 1.05, 1],
    duration: 30,
  },
  {
    className: 'w-[40%] h-[40%] bottom-[2%] right-[20%]',
    bg: 'bg-gradient-to-b from-emerald-300/18 via-teal-400/10 to-transparent',
    x: [0, -50, 35, -40, 0],
    y: [0, 30, -45, 35, 0],
    scale: [1, 0.93, 1.12, 0.96, 1],
    duration: 34,
  },
  {
    className: 'w-[28%] h-[28%] top-[45%] left-[2%]',
    bg: 'bg-gradient-to-r from-amber-300/15 via-orange-400/10 to-transparent',
    x: [0, 35, -20, 30, 0],
    y: [0, -20, 30, -15, 0],
    scale: [1, 1.08, 0.94, 1.04, 1],
    duration: 22,
  },
  {
    className: 'w-[30%] h-[30%] top-[3%] right-[30%]',
    bg: 'bg-gradient-to-bl from-violet-300/18 via-fuchsia-400/10 to-transparent',
    x: [0, -20, 40, -25, 0],
    y: [0, 28, -20, 15, 0],
    scale: [1, 1.06, 0.95, 1.03, 1],
    duration: 20,
  },
];

export default function FluidBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ filter: 'blur(60px)' }}>
        {blobs.map((blob, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${blob.bg} ${blob.className}`}
            animate={{
              x: blob.x,
              y: blob.y,
              scale: blob.scale,
            }}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-50/60 via-white/40 to-zinc-50/20" />
    </div>
  );
}
