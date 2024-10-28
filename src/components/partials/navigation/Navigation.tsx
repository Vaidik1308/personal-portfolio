'use client'
import { navigationData } from '@/lib/data'
import Link from 'next/link'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Navigation = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
        {
          navigationData.map((item, i) => (
            <li 
              className='capitalize relative ' 
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link className=' relative z-10' href={item.path}>
                {item.label}
              </Link>
              {hoveredIndex === i && (
                <motion.div
                  className='absolute left-0 bottom-0 h-[3px] bg-gray-400 w-full'
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  exit={{ width: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </li>
          ))
        }
    </>
  )
}

export default Navigation