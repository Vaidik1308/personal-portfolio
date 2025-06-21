"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "@/providers/ThemeProvider"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme, isTransitioning } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    if (isTransitioning || !mounted) return // Prevent multiple clicks during transition
    
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />
      case "dark":
        return <Moon className="h-4 w-4" />
      case "system":
        return <Monitor className="h-4 w-4" />
      default:
        return <Sun className="h-4 w-4" />
    }
  }

  const getTooltip = () => {
    if (isTransitioning) return "Switching theme..."
    if (!mounted) return "Loading theme..."
    
    switch (theme) {
      case "light":
        return "Switch to dark mode"
      case "dark":
        return "Switch to system theme"
      case "system":
        return "Switch to light mode"
      default:
        return "Toggle theme"
    }
  }

  const getThemeColor = () => {
    switch (theme) {
      case "light":
        return "text-yellow-500"
      case "dark":
        return "text-blue-400"
      case "system":
        return "text-purple-400"
      default:
        return "text-foreground"
    }
  }

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="theme-toggle relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-lg">
        <div className="w-4 h-4 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <motion.button
      onClick={toggleTheme}
      disabled={isTransitioning}
      className={`theme-toggle relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-lg hover:shadow-md ${
        isTransitioning ? 'cursor-not-allowed opacity-50' : ''
      }`}
      title={getTooltip()}
      aria-label={getTooltip()}
      whileHover={!isTransitioning ? { scale: 1.05 } : {}}
      whileTap={!isTransitioning ? { scale: 0.95 } : {}}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
          className={`theme-toggle-icon rounded-full ${getThemeColor()} ${
            isTransitioning ? 'animate-pulse' : ''
          }`}
        >
          {getIcon()}
        </motion.div>
      </AnimatePresence>
      <span className="sr-only">Toggle theme</span>
    </motion.button>
  )
} 