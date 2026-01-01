import { useState } from 'react'
import type { GalleryData, Portfolio } from '@/interfaces/Portfolio'
import { Lightbox } from '@/components/ui/lightbox'
import { cn } from '@/lib/utils'

interface GallerySectionProps {
  data: GalleryData
  theme: Portfolio['theme']
  variant?: string
}

export function GallerySection({ data, theme, variant = 'A' }: GallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const isDark = theme.mode === 'dark'
  const primaryColor = theme.primaryColor

  // Filter images by category
  const filteredImages =
    activeCategory === 'All'
      ? data.images
      : data.images.filter((img) => img.category === activeCategory)

  // Prepare images for lightbox
  const lightboxImages = filteredImages.map((img) => ({
    url: img.url,
    title: img.title,
    description: img.description,
  }))

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  // Variant A: Masonry Grid
  if (variant === 'A') {
    return (
      <section
        id="gallery"
        className={cn('py-20', isDark ? 'bg-gray-900' : 'bg-white')}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          {(data.title || data.description) && (
            <div className="text-center mb-12">
              {data.title && (
                <h2
                  className={cn(
                    'text-4xl md:text-5xl font-bold mb-4',
                    isDark ? 'text-white' : 'text-gray-900',
                  )}
                >
                  {data.title}
                </h2>
              )}
              {data.description && (
                <p
                  className={cn(
                    'text-lg max-w-2xl mx-auto',
                    isDark ? 'text-gray-400' : 'text-gray-600',
                  )}
                >
                  {data.description}
                </p>
              )}
            </div>
          )}

          {/* Category Filter */}
          {data.categories && data.categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {data.categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    'px-5 py-2 rounded-full text-sm font-medium transition-all duration-300',
                    activeCategory === category
                      ? 'text-white shadow-lg'
                      : isDark
                        ? 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200',
                  )}
                  style={
                    activeCategory === category
                      ? { backgroundColor: primaryColor }
                      : undefined
                  }
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="break-inside-avoid group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="relative overflow-hidden rounded-xl">
                  {image.url ? (
                    <img
                      src={image.url}
                      alt={image.title || `Gallery image ${index + 1}`}
                      className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className={cn(
                        'w-full aspect-square flex items-center justify-center',
                        isDark ? 'bg-gray-800' : 'bg-gray-200',
                      )}
                    >
                      <span className={isDark ? 'text-gray-600' : 'text-gray-400'}>
                        No image
                      </span>
                    </div>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                    <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      {image.title && (
                        <h3 className="text-white font-medium text-lg">{image.title}</h3>
                      )}
                      {image.category && (
                        <span className="text-white/70 text-sm">{image.category}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filteredImages.length === 0 && (
            <div
              className={cn(
                'text-center py-20',
                isDark ? 'text-gray-500' : 'text-gray-400',
              )}
            >
              <p className="text-lg">No images in this category</p>
            </div>
          )}
        </div>

        {/* Lightbox */}
        <Lightbox
          images={lightboxImages}
          initialIndex={lightboxIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      </section>
    )
  }

  // Variant B: Grid Layout
  if (variant === 'B') {
    return (
      <section
        id="gallery"
        className={cn('py-20', isDark ? 'bg-gray-900' : 'bg-white')}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          {(data.title || data.description) && (
            <div className="text-center mb-12">
              {data.title && (
                <h2
                  className={cn(
                    'text-4xl md:text-5xl font-bold mb-4',
                    isDark ? 'text-white' : 'text-gray-900',
                  )}
                >
                  {data.title}
                </h2>
              )}
              {data.description && (
                <p
                  className={cn(
                    'text-lg max-w-2xl mx-auto',
                    isDark ? 'text-gray-400' : 'text-gray-600',
                  )}
                >
                  {data.description}
                </p>
              )}
            </div>
          )}

          {/* Category Filter */}
          {data.categories && data.categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {data.categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    'px-5 py-2 rounded-full text-sm font-medium transition-all duration-300',
                    activeCategory === category
                      ? 'text-white shadow-lg'
                      : isDark
                        ? 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200',
                  )}
                  style={
                    activeCategory === category
                      ? { backgroundColor: primaryColor }
                      : undefined
                  }
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  {image.url ? (
                    <img
                      src={image.url}
                      alt={image.title || `Gallery image ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className={cn(
                        'w-full h-full flex items-center justify-center',
                        isDark ? 'bg-gray-800' : 'bg-gray-200',
                      )}
                    >
                      <span className={isDark ? 'text-gray-600' : 'text-gray-400'}>
                        No image
                      </span>
                    </div>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6">
                      {image.title && (
                        <h3 className="text-white font-semibold text-xl mb-1">
                          {image.title}
                        </h3>
                      )}
                      {image.description && (
                        <p className="text-white/80 text-sm">{image.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filteredImages.length === 0 && (
            <div
              className={cn(
                'text-center py-20',
                isDark ? 'text-gray-500' : 'text-gray-400',
              )}
            >
              <p className="text-lg">No images in this category</p>
            </div>
          )}
        </div>

        {/* Lightbox */}
        <Lightbox
          images={lightboxImages}
          initialIndex={lightboxIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      </section>
    )
  }

  // Variant C: Full-width Carousel Style
  return (
    <section
      id="gallery"
      className={cn('py-20', isDark ? 'bg-gray-900' : 'bg-white')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(data.title || data.description) && (
          <div className="text-center mb-12">
            {data.title && (
              <h2
                className={cn(
                  'text-4xl md:text-5xl font-bold mb-4',
                  isDark ? 'text-white' : 'text-gray-900',
                )}
              >
                {data.title}
              </h2>
            )}
            {data.description && (
              <p
                className={cn(
                  'text-lg max-w-2xl mx-auto',
                  isDark ? 'text-gray-400' : 'text-gray-600',
                )}
              >
                {data.description}
              </p>
            )}
          </div>
        )}

        {/* Category Filter */}
        {data.categories && data.categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {data.categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'px-5 py-2 rounded-full text-sm font-medium transition-all duration-300',
                  activeCategory === category
                    ? 'text-white shadow-lg'
                    : isDark
                      ? 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200',
                )}
                style={
                  activeCategory === category
                    ? { backgroundColor: primaryColor }
                    : undefined
                }
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Large featured + grid */}
        {filteredImages.length > 0 && (
          <div className="space-y-6">
            {/* Featured image (first) */}
            <div
              className="group cursor-pointer"
              onClick={() => openLightbox(0)}
            >
              <div className="relative aspect-[21/9] overflow-hidden rounded-3xl">
                {filteredImages[0].url ? (
                  <img
                    src={filteredImages[0].url}
                    alt={filteredImages[0].title || 'Featured image'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className={cn(
                      'w-full h-full flex items-center justify-center',
                      isDark ? 'bg-gray-800' : 'bg-gray-200',
                    )}
                  >
                    <span className={isDark ? 'text-gray-600' : 'text-gray-400'}>
                      No image
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                  <div className="p-8">
                    {filteredImages[0].title && (
                      <h3 className="text-white font-bold text-3xl mb-2">
                        {filteredImages[0].title}
                      </h3>
                    )}
                    {filteredImages[0].description && (
                      <p className="text-white/80 text-lg">{filteredImages[0].description}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Rest in grid */}
            {filteredImages.length > 1 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filteredImages.slice(1).map((image, index) => (
                  <div
                    key={image.id}
                    className="group cursor-pointer"
                    onClick={() => openLightbox(index + 1)}
                  >
                    <div className="relative aspect-square overflow-hidden rounded-xl">
                      {image.url ? (
                        <img
                          src={image.url}
                          alt={image.title || `Gallery image ${index + 2}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className={cn(
                            'w-full h-full flex items-center justify-center',
                            isDark ? 'bg-gray-800' : 'bg-gray-200',
                          )}
                        >
                          <span className={isDark ? 'text-gray-600' : 'text-gray-400'}>
                            No image
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Empty state */}
        {filteredImages.length === 0 && (
          <div
            className={cn(
              'text-center py-20',
              isDark ? 'text-gray-500' : 'text-gray-400',
            )}
          >
            <p className="text-lg">No images in this category</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  )
}

