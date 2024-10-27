'use client'
import React from 'react';
import { motion } from 'framer-motion';

interface LetterAnimationProps {
  text: string;
}

const LetterAnimation: React.FC<LetterAnimationProps> = ({ text }) => {
  // Define an array of colors
  const colors = [
    'text-red-500',
    'text-blue-500',
    'text-green-500',
    'text-yellow-500',
    'text-purple-500',
    'text-pink-500',
    'text-orange-500',
    'text-teal-500',
    'text-indigo-500',
    'text-gray-500',
  ];

  return (
    <div className="flex md:p-3 py-2 ">
      {text.split('').map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }} // Start off-screen
          animate={{ opacity: 1, y: 0 }} // Animate to visible
          transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered delay
          className={`inline-block ${colors[index % colors.length]}`} // Assign color based on index
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
};

export default LetterAnimation;