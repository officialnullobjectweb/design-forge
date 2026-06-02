'use client';

import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  delay?: number;
}

export default function AnimatedCard({ children, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ y: 25, scale: 0.97 }}
      whileInView={{ y: 0, scale: 1 }}
      viewport={{ once: false, margin: '-50px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
