/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedPage: React.FC = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={{
        initial: {
          opacity: 0,
          // scale: 0.9,
        },
        in: {
          opacity: 1,
          // scale: 1,
        },
        out: {
          opacity: 0,
          // scale: 1.1,
        },
      }}
      transition={{
        type: 'tween',
        ease: 'anticipate',
        duration: 0.5,
      }}
      sx={{ variant: 'layout.page' }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
