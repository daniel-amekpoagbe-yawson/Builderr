import { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LightboxImage {
  url: string
  title?: string
  description?: string
}

interface LightboxProps {
  images: LightboxImage[]
  initialIndex?: number
  isOpen: boolean
  onClose: () => void
}

export function Lightbox({ images, initialIndex = 0, isOpen, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const currentImage = images[currentIndex]

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setIsZoomed(false)
    setIsLoading(true)
  }, [images.length])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    setIsZoomed(false)
    setIsLoading(true)
  }, [images.length])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowRight':
          goToNext()
          break
        case 'ArrowLeft':
          goToPrev()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, goToNext, goToPrev])

  // Reset index when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex)
      setIsZoomed(false)
      setIsLoading(true)
    }
  }, [isOpen, initialIndex])

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen || !currentImage) return null

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = currentImage.url
    link.download = currentImage.title || `image-${currentIndex + 1}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Toolbar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
          aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
        >
          {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
        </button>
        <div className="w-px h-6 bg-white/20" />
        <button
          onClick={handleDownload}
          className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
          aria-label="Download image"
        >
          <Download className="w-5 h-5" />
        </button>
        <div className="w-px h-6 bg-white/20" />
        <span className="text-white/80 text-sm px-2">
          {currentIndex + 1} / {images.length}
        </span>
      </div>

      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      {/* Image */}
      <div
        className={cn(
          'relative flex items-center justify-center w-full h-full p-16',
          isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in',
        )}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        )}

        <img
          src={currentImage.url}
          alt={currentImage.title || `Image ${currentIndex + 1}`}
          className={cn(
            'max-w-full max-h-full object-contain transition-all duration-300',
            isZoomed ? 'scale-150' : 'scale-100',
            isLoading ? 'opacity-0' : 'opacity-100',
          )}
          onLoad={() => setIsLoading(false)}
          draggable={false}
        />
      </div>

      {/* Caption */}
      {(currentImage.title || currentImage.description) && (
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
          <div className="max-w-3xl mx-auto text-center">
            {currentImage.title && (
              <h3 className="text-xl font-medium text-white mb-1">{currentImage.title}</h3>
            )}
            {currentImage.description && (
              <p className="text-white/70">{currentImage.description}</p>
            )}
          </div>
        </div>
      )}

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 p-2 rounded-lg bg-black/50 backdrop-blur-sm max-w-[80vw] overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation()
                setCurrentIndex(index)
                setIsZoomed(false)
                setIsLoading(true)
              }}
              className={cn(
                'flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all',
                index === currentIndex
                  ? 'border-white opacity-100'
                  : 'border-transparent opacity-50 hover:opacity-75',
              )}
            >
              <img
                src={image.url}
                alt={image.title || `Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

