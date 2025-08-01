'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './Button'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closeOnOverlayClick?: boolean
  closeOnEsc?: boolean
  showCloseButton?: boolean
  className?: string
}

const sizeVariants = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl'
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  className
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Handle escape key
  useEffect(() => {
    if (!closeOnEsc) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose, closeOnEsc])

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Focus the modal when it opens
      modalRef.current?.focus()
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden'
    } else {
      // Restore body scroll
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Handle overlay click
  const handleOverlayClick = (event: React.MouseEvent) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose()
    }
  }

  // Don't render if not open
  if (!isOpen) return null

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="modal-overlay"
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          aria-describedby={description ? 'modal-description' : undefined}
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'modal-content',
              sizeVariants[size],
              className
            )}
            tabIndex={-1}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between p-6 pb-4">
                <div>
                  {title && (
                    <h2 id="modal-title" className="heading-md text-gray-900">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p id="modal-description" className="text-gray-600 mt-1">
                      {description}
                    </p>
                  )}
                </div>
                {showCloseButton && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="ml-4 p-2 hover:bg-gray-100 rounded-lg"
                    aria-label="Cerrar modal"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                )}
              </div>
            )}

            {/* Content */}
            <div className={cn('px-6', (title || showCloseButton) ? 'pb-6' : 'py-6')}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  // Render in portal
  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body)
  }

  return null
}

// Modal compound components
export const ModalHeader = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn('mb-4', className)}>
    {children}
  </div>
)

export const ModalBody = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn('', className)}>
    {children}
  </div>
)

export const ModalFooter = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn('flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100', className)}>
    {children}
  </div>
)