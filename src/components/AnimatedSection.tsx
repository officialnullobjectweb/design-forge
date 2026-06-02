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
      initial={{ y: 40, scale: 0.97 }}
      whileInView={{ y: 0, scale: 1 }}
      viewport={{ once: false, margin: '-100px' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.section>
  );
}
