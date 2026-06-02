'use client';

import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedSection({ children, className }: Props) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 1, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
}
