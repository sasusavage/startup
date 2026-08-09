import type { ReactNode } from 'react';
import { motion } from 'motion/react';

import { EASE } from '../motion';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before the element starts moving. */
  delay?: number;
};

/** Fades its children up once, the first time they scroll into view. */
export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
