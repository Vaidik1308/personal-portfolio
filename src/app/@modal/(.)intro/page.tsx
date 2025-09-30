import React from 'react'
import ModalContainer from '@/components/Reusable/ModalContainer'

const Page = () => {
  return (
    <ModalContainer 
      title="This PC" 
      size="lg"
      showCloseButton={true}
      closeOnBackdropClick={true}
      closeOnEscape={true}
    >
      <div className="p-6 space-y-4">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
            </svg>
          </div>
          <h2 className="text-xl font-semibold">This PC</h2>
          <p className="text-muted-foreground">Your computer's main storage and devices</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Local Disk (C:)</h3>
                <p className="text-sm text-muted-foreground">System Drive</p>
              </div>
            </div>
          </div>

          <div className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500/20 rounded flex items-center justify-center">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Documents</h3>
                <p className="text-sm text-muted-foreground">Personal Files</p>
              </div>
            </div>
          </div>

          <div className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-500/20 rounded flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Pictures</h3>
                <p className="text-sm text-muted-foreground">Image Gallery</p>
              </div>
            </div>
          </div>

          <div className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-500/20 rounded flex items-center justify-center">
                <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Downloads</h3>
                <p className="text-sm text-muted-foreground">Downloaded Files</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Space: 500 GB</span>
            <span className="text-sm text-muted-foreground">Free Space: 250 GB</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 mt-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: '50%' }}></div>
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default Page