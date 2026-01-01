import { supabase } from '@/lib/Supabase'

const BUCKET_NAME = 'portfolio-images'
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

export interface UploadResult {
  url: string
  path: string
}

export interface UploadProgress {
  loaded: number
  total: number
  percentage: number
}

class ImageService {
  /**
   * Validates the file before upload
   */
  validateFile(file: File): { valid: boolean; error?: string } {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return {
        valid: false,
        error: `Invalid file type. Allowed types: ${ALLOWED_TYPES.map((t) => t.replace('image/', '')).join(', ')}`,
      }
    }

    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB`,
      }
    }

    return { valid: true }
  }

  /**
   * Compresses an image file before upload
   */
  async compressImage(
    file: File,
    maxWidth = 1920,
    quality = 0.8,
  ): Promise<File> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img

        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }

        canvas.width = width
        canvas.height = height

        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              })
              resolve(compressedFile)
            } else {
              reject(new Error('Failed to compress image'))
            }
          },
          file.type,
          quality,
        )
      }

      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = URL.createObjectURL(file)
    })
  }

  /**
   * Generates a unique file path for storage
   */
  generateFilePath(userId: string, fileName: string): string {
    const timestamp = Date.now()
    const randomId = crypto.randomUUID().slice(0, 8)
    const extension = fileName.split('.').pop()?.toLowerCase() || 'jpg'
    const sanitizedName = fileName
      .replace(/\.[^/.]+$/, '') // Remove extension
      .replace(/[^a-zA-Z0-9]/g, '-') // Replace special chars
      .slice(0, 50) // Limit length

    return `${userId}/${timestamp}-${randomId}-${sanitizedName}.${extension}`
  }

  /**
   * Uploads an image to Supabase Storage
   */
  async uploadImage(
    file: File,
    userId: string,
    options?: {
      compress?: boolean
      maxWidth?: number
      quality?: number
      onProgress?: (progress: UploadProgress) => void
    },
  ): Promise<UploadResult> {
    // Validate file
    const validation = this.validateFile(file)
    if (!validation.valid) {
      throw new Error(validation.error)
    }

    // Compress if enabled (default: true)
    let fileToUpload = file
    if (options?.compress !== false) {
      try {
        fileToUpload = await this.compressImage(
          file,
          options?.maxWidth || 1920,
          options?.quality || 0.85,
        )
      } catch (error) {
        console.warn('Image compression failed, uploading original:', error)
        fileToUpload = file
      }
    }

    // Generate path
    const filePath = this.generateFilePath(userId, file.name)

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, fileToUpload, {
        cacheControl: '31536000', // 1 year cache
        upsert: false,
      })

    if (error) {
      console.error('Upload error:', error)
      throw new Error(`Failed to upload image: ${error.message}`)
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path)

    return {
      url: publicUrl,
      path: data.path,
    }
  }

  /**
   * Deletes an image from storage
   */
  async deleteImage(path: string): Promise<void> {
    const { error } = await supabase.storage.from(BUCKET_NAME).remove([path])

    if (error) {
      console.error('Delete error:', error)
      throw new Error(`Failed to delete image: ${error.message}`)
    }
  }

  /**
   * Extracts the storage path from a full URL
   */
  getPathFromUrl(url: string): string | null {
    try {
      const bucketUrl = `/storage/v1/object/public/${BUCKET_NAME}/`
      const index = url.indexOf(bucketUrl)
      if (index === -1) return null

      return url.slice(index + bucketUrl.length)
    } catch {
      return null
    }
  }

  /**
   * Creates a preview URL for a file (before upload)
   */
  createPreviewUrl(file: File): string {
    return URL.createObjectURL(file)
  }

  /**
   * Revokes a preview URL to free memory
   */
  revokePreviewUrl(url: string): void {
    URL.revokeObjectURL(url)
  }
}

export const imageService = new ImageService()
