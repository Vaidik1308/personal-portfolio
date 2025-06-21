"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  isTransitioning: boolean
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  isTransitioning: false,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Handle initial theme loading on client side
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage?.getItem(storageKey) as Theme
    if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
      setThemeState(savedTheme)
    }
  }, [storageKey])

  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement

    // Add transition class for smooth theme switching
    root.classList.add("theme-transitioning")
    
    // Remove existing theme classes
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }

    // Remove transition class after animation completes
    const timer = setTimeout(() => {
      root.classList.remove("theme-transitioning")
    }, 400) // Match the CSS transition duration

    return () => clearTimeout(timer)
  }, [theme, mounted])

  const setTheme = (newTheme: Theme) => {
    if (!mounted) return
    
    setIsTransitioning(true)
    
    // Add a small delay for visual feedback
    setTimeout(() => {
      localStorage?.setItem(storageKey, newTheme)
      setThemeState(newTheme)
      setIsTransitioning(false)
    }, 150)
  }

  const value = {
    theme,
    setTheme,
    isTransitioning,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
} 