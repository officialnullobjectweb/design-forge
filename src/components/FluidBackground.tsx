'use client';

import { motion } from 'framer-motion';

const blobs = [
  {
    className: 'w-[70%] h-[70%] top-[-15%] left-[-12%]',
    bg: 'bg-gradient-to-br from-violet-400/20 via-violet-500/12 to-transparent',
    x: [0, 60, -40, 30, 0],
    y: [0, -40, 30, -20, 0],
    scale: [1, 1.1, 0.95, 1.05, 1],
    duration: 22,
  },
  {
    className: 'w-[60%] h-[60%] bottom-[-18%] right-[-12%]',
    bg: 'bg-gradient-to-bl from-emerald-300/20 via-teal-400/12 to-transparent',
    x: [0, -70, 40, -30, 0],
    y: [0, 50, -30, 40, 0],
    scale: [1, 1.12, 0.93, 1.06, 1],
    duration: 26,
  },
  {
    className: 'w-[40%] h-[40%] top-[25%] right-[8%]',
    bg: 'bg-gradient-to-r from-amber-300/15 via-orange-400/10 to-transparent',
    x: [0, 45, -55, 25, 0],
    y: [0, -30, 45, -20, 0],
    scale: [1, 1.15, 0.9, 1.08, 1],
    duration: 30,
  },
  {
    className: 'w-[35%] h-[35%] bottom-[22%] left-[10%]',
    bg: 'bg-gradient-to-tr from-fuchsia-300/15 via-purple-400/10 to-transparent',
    x: [0, -35, 50, -20, 0],
    y: [0, 30, -25, 35, 0],
    scale: [1, 0.92, 1.1, 0.96, 1],
    duration: 24,
  },
  {
    className: 'w-[25%] h-[25%] top-[10%] left-[35%]',
    bg: 'bg-gradient-to-t from-violet-300/12 via-indigo-400/8 to-transparent',
    x: [0, 30, -20, 40, 0],
    y: [0, -25, 35, -15, 0],
    scale: [1, 1.08, 0.95, 1.04, 1],
    duration: 28,
  },
  {
    className: 'w-[30%] h-[30%] bottom-[5%] right-[25%]',
    bg: 'bg-gradient-to-b from-emerald-200/12 via-teal-300/8 to-transparent',
    x: [0, -40, 25, -30, 0],
    y: [0, 20, -35, 25, 0],
    scale: [1, 0.95, 1.1, 0.98, 1],
    duration: 32,
  },
  {
    className: 'w-[20%] h-[20%] top-[50%] left-[5%]',
    bg: 'bg-gradient-to-r from-amber-200/10 via-orange-300/8 to-transparent',
    x: [0, 25, -15, 20, 0],
    y: [0, -15, 20, -10, 0],
    scale: [1, 1.06, 0.96, 1.03, 1],
    duration: 20,
  },
  {
    className: 'w-[22%] h-[22%] top-[5%] right-[35%]',
    bg: 'bg-gradient-to-bl from-violet-200/10 via-fuchsia-300/8 to-transparent',
    x: [0, -15, 30, -20, 0],
    y: [0, 20, -15, 10, 0],
    scale: [1, 1.04, 0.97, 1.02, 1],
    duration: 18,
  },
];

export default function FluidBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ filter: 'blur(70px)' }}>
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-50/70 via-white/50 to-zinc-50/30" />
    </div>
  );
}
