'use client';

import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  delay?: number;
}

export default function AnimatedCard({ children, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
