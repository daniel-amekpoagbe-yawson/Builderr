import { useState, useRef, useCallback } from 'react'
import { imageService } from '@/services/image.service'
import { useAuthStore } from '@/store/auth.store'
import { Upload, X, Image as ImageIcon, Loader2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  onRemove?: () => void
  className?: string
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto'
  placeholder?: string
  disabled?: boolean
  showUrlInput?: boolean
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  className,
  aspectRatio = 'auto',
  placeholder = 'Drag & drop an image or click to browse',
  disabled = false,
  showUrlInput = true,
}: ImageUploadProps) {
  const { user } = useAuthStore()
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [showUrlField, setShowUrlField] = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    auto: 'min-h-[200px]',
  }

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const files = e.dataTransfer.files
      if (files.length > 0) {
        await handleFileUpload(files[0])
      }
    },
    [user],
  )

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        await handleFileUpload(files[0])
      }
      // Reset input so same file can be selected again
      e.target.value = ''
    },
    [user],
  )

  const handleFileUpload = async (file: File) => {
    if (!user) {
      setError('Please sign in to upload images')
      return
    }

    // Validate file
    const validation = imageService.validateFile(file)
    if (!validation.valid) {
      setError(validation.error || 'Invalid file')
      return
    }

    setError(null)
    setIsUploading(true)
    setUploadProgress(0)

    // Create preview immediately
    const preview = imageService.createPreviewUrl(file)
    setPreviewUrl(preview)

    try {
      // Simulate progress for better UX (actual progress would need XMLHttpRequest)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90))
      }, 100)

      const result = await imageService.uploadImage(file, user.id, {
        compress: true,
        maxWidth: 1920,
        quality: 0.85,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      // Clean up preview and set actual URL
      imageService.revokePreviewUrl(preview)
      setPreviewUrl(null)
      onChange(result.url)
    } catch (err: any) {
      console.error('Upload failed:', err)
      setError(err.message || 'Failed to upload image')
      imageService.revokePreviewUrl(preview)
      setPreviewUrl(null)
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleRemove = useCallback(async () => {
    if (value) {
      // Optionally delete from storage
      const path = imageService.getPathFromUrl(value)
      if (path) {
        try {
          await imageService.deleteImage(path)
        } catch (err) {
          console.warn('Failed to delete image from storage:', err)
        }
      }
    }
    onChange('')
    onRemove?.()
  }, [value, onChange, onRemove])

  const handleUrlSubmit = useCallback(() => {
    if (urlInput.trim()) {
      // Basic URL validation
      try {
        new URL(urlInput)
        onChange(urlInput.trim())
        setUrlInput('')
        setShowUrlField(false)
        setError(null)
      } catch {
        setError('Please enter a valid URL')
      }
    }
  }, [urlInput, onChange])

  const displayUrl = previewUrl || value
  const hasImage = !!displayUrl

  return (
    <div className={cn('space-y-2', className)}>
      <div
        className={cn(
          'relative border-2 border-dashed rounded-lg transition-all overflow-hidden',
          aspectRatioClasses[aspectRatio],
          isDragging && 'border-indigo-500 bg-indigo-50',
          !isDragging && !hasImage && 'border-gray-300 hover:border-gray-400',
          hasImage && 'border-transparent',
          disabled && 'opacity-50 cursor-not-allowed',
          error && 'border-red-300',
        )}
        onDragEnter={!disabled ? handleDragEnter : undefined}
        onDragLeave={!disabled ? handleDragLeave : undefined}
        onDragOver={!disabled ? handleDragOver : undefined}
        onDrop={!disabled ? handleDrop : undefined}
      >
        {/* Image Preview */}
        {hasImage && (
          <div className="absolute inset-0">
            <img
              src={displayUrl}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={() => {
                if (!previewUrl) {
                  setError('Failed to load image')
                }
              }}
            />
            {/* Overlay for uploading state */}
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
                <Loader2 className="w-8 h-8 animate-spin mb-2" />
                <span className="text-sm font-medium">Uploading... {uploadProgress}%</span>
                <div className="w-32 h-1.5 bg-white/30 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
            {/* Remove button */}
            {!isUploading && !disabled && (
              <button
                onClick={handleRemove}
                className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors"
                title="Remove image"
                type="button"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Upload Area */}
        {!hasImage && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled || isUploading}
            className="absolute inset-0 flex flex-col items-center justify-center p-6 cursor-pointer"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-3" />
                <span className="text-sm text-gray-600">Uploading... {uploadProgress}%</span>
              </>
            ) : (
              <>
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  {isDragging ? (
                    <Upload className="w-7 h-7 text-indigo-500" />
                  ) : (
                    <ImageIcon className="w-7 h-7 text-gray-400" />
                  )}
                </div>
                <span className="text-sm text-gray-600 text-center">{placeholder}</span>
                <span className="text-xs text-gray-400 mt-1">PNG, JPG, GIF, WebP up to 5MB</span>
              </>
            )}
          </button>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleFileSelect}
          disabled={disabled || isUploading}
          className="hidden"
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-1.5 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* URL Input Option */}
      {showUrlInput && !hasImage && (
        <div className="space-y-2">
          {!showUrlField ? (
            <button
              type="button"
              onClick={() => setShowUrlField(true)}
              className="text-sm text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Or paste an image URL
            </button>
          ) : (
            <div className="flex gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
                placeholder="https://example.com/image.jpg"
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={handleUrlSubmit}
                className="px-3 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowUrlField(false)
                  setUrlInput('')
                  setError(null)
                }}
                className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

