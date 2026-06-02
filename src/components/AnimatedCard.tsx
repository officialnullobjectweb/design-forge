'use client';

import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  delay?: number;
}

export default function AnimatedCard({ children, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
