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
      initial={{ opacity: 0, y: 50, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.section>
  );
}
