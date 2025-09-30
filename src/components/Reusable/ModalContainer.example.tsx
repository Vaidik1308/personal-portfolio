// Example usage of ModalContainer component

import React from 'react'
import ModalContainer from './ModalContainer'

// Basic usage
export function BasicModal() {
  return (
    <ModalContainer title="Basic Modal">
      <div className="p-6">
        <p>This is a basic modal with default settings.</p>
      </div>
    </ModalContainer>
  )
}

// Large modal with custom close behavior
export function LargeModal() {
  const handleClose = () => {
    console.log('Custom close handler')
    // Custom logic here
  }

  return (
    <ModalContainer 
      title="Large Modal" 
      size="lg"
      onClose={handleClose}
    >
      <div className="p-6">
        <p>This is a large modal with custom close behavior.</p>
      </div>
    </ModalContainer>
  )
}

// Modal without close button
export function NoCloseModal() {
  return (
    <ModalContainer 
      title="No Close Button"
      showCloseButton={false}
      closeOnBackdropClick={false}
      closeOnEscape={false}
    >
      <div className="p-6">
        <p>This modal cannot be closed by user interaction.</p>
        <p>You need to handle closing programmatically.</p>
      </div>
    </ModalContainer>
  )
}

// Full width modal
export function FullWidthModal() {
  return (
    <ModalContainer 
      title="Full Width Modal"
      size="full"
    >
      <div className="p-6">
        <p>This modal takes the full width of the screen.</p>
      </div>
    </ModalContainer>
  )
}

// Modal with form
export function FormModal() {
  return (
    <ModalContainer 
      title="Contact Form"
      size="md"
    >
      <form className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input 
            type="text" 
            className="w-full p-2 border border-border rounded-md bg-background"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input 
            type="email" 
            className="w-full p-2 border border-border rounded-md bg-background"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Message</label>
          <textarea 
            className="w-full p-2 border border-border rounded-md bg-background h-24"
            placeholder="Enter your message"
          />
        </div>
        <div className="flex gap-2 pt-4">
          <button 
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Send
          </button>
          <button 
            type="button"
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90"
          >
            Cancel
          </button>
        </div>
      </form>
    </ModalContainer>
  )
}
