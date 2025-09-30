"use client"

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface ModalContainerProps {
  children: React.ReactNode
  title?: string
  onClose?: () => void
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  showCloseButton?: boolean
  closeOnBackdropClick?: boolean
  closeOnEscape?: boolean
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg', 
  xl: 'max-w-2xl',
  full: 'max-w-full mx-4'
}

const ModalContainer = ({
  children,
  title,
  onClose,
  size = 'md',
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true
}: ModalContainerProps) => {
  const router = useRouter()

  const handleClose = () => {
    if (onClose) {
      onClose()
    } else {
      router.back()
    }
  }

  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [closeOnEscape])

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeOnBackdropClick ? handleClose : undefined}
        />
        
        {/* Modal Window - Windows-style zoom out animation */}
        <motion.div
          initial={{ 
            scale: 0.3, 
            opacity: 0,
            y: 50,
            rotateX: -15
          }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            y: 0,
            rotateX: 0
          }}
          exit={{ 
            scale: 0.3, 
            opacity: 0,
            y: 50,
            rotateX: -15
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300,
            duration: 0.4
          }}
          className={`relative bg-background border border-border rounded-lg shadow-2xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden`}
          onClick={(e) => e.stopPropagation()}
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}
        >
          {/* Window Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
              {title && (
                <h2 className="text-lg font-semibold text-foreground">{title}</h2>
              )}
              {showCloseButton && (
                <button
                  onClick={handleClose}
                  className="p-1 rounded-full hover:bg-accent transition-colors group"
                  aria-label="Close modal"
                >
                  <motion.svg
                    className="w-5 h-5 text-muted-foreground group-hover:text-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </motion.svg>
                </button>
              )}
            </div>
          )}
          
          {/* Modal Content */}
          <motion.div 
            className="overflow-auto max-h-[calc(90vh-80px)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            {children}
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ModalContainer