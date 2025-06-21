"use client"

import { useTheme } from "@/providers/ThemeProvider"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeTransitionIndicator() {
  const { isTransitioning } = useTheme()

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed top-4 right-4 z-50 pointer-events-none"
          transition={{
            duration: 0.2,
            ease: "easeInOut"
          }}
        >
          <div className="flex items-center gap-2 px-3 py-2 bg-background/80 backdrop-blur-sm border border-border rounded-lg shadow-lg">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              }}
              className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
            />
            <span className="text-sm text-foreground">Switching theme...</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 