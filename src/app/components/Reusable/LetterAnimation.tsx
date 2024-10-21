'use client'
import React from 'react';
import { motion } from 'framer-motion';

interface LetterAnimationProps {
  text: string;
}

const LetterAnimation: React.FC<LetterAnimationProps> = ({ text }) => {
  return (
    <div className="flex p-3">
      { text.split('').map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }} // Start off-screen
          animate={{ opacity: 1, y: 0 }} // Animate to visible
          transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered delay
          className="inline-block" // Ensure letters are inline
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
};

export default LetterAnimation;