/**
 * Validation utilities for form inputs
 */

export interface ValidationResult {
  valid: boolean
  error?: string
}

/**
 * Validates a URL string
 */
export function validateUrl(url: string, required = false): ValidationResult {
  if (!url || url.trim() === '') {
    if (required) {
      return { valid: false, error: 'URL is required' }
    }
    return { valid: true } // Empty is valid if not required
  }

  // Allow relative URLs starting with #
  if (url.startsWith('#')) {
    return { valid: true }
  }

  try {
    new URL(url)
    return { valid: true }
  } catch {
    return { valid: false, error: 'Please enter a valid URL (e.g., https://example.com)' }
  }
}

/**
 * Validates an email address
 */
export function validateEmail(email: string, required = false): ValidationResult {
  if (!email || email.trim() === '') {
    if (required) {
      return { valid: false, error: 'Email is required' }
    }
    return { valid: true }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (emailRegex.test(email)) {
    return { valid: true }
  }

  return { valid: false, error: 'Please enter a valid email address' }
}

/**
 * Validates text length
 */
export function validateLength(
  text: string,
  options: {
    min?: number
    max?: number
    required?: boolean
    fieldName?: string
  } = {}
): ValidationResult {
  const { min, max, required = false, fieldName = 'Field' } = options

  if (!text || text.trim() === '') {
    if (required) {
      return { valid: false, error: `${fieldName} is required` }
    }
    return { valid: true }
  }

  const length = text.trim().length

  if (min !== undefined && length < min) {
    return { valid: false, error: `${fieldName} must be at least ${min} characters` }
  }

  if (max !== undefined && length > max) {
    return { valid: false, error: `${fieldName} must be no more than ${max} characters` }
  }

  return { valid: true }
}

/**
 * Validates a phone number (basic validation)
 */
export function validatePhone(phone: string, required = false): ValidationResult {
  if (!phone || phone.trim() === '') {
    if (required) {
      return { valid: false, error: 'Phone number is required' }
    }
    return { valid: true }
  }

  // Basic phone validation - allows various formats
  const phoneRegex = /^[\d\s\-\+\(\)]+$/
  if (phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10) {
    return { valid: true }
  }

  return { valid: false, error: 'Please enter a valid phone number' }
}

/**
 * Validates a social media URL (GitHub, LinkedIn, Twitter)
 */
export function validateSocialUrl(url: string, platform?: string): ValidationResult {
  if (!url || url.trim() === '') {
    return { valid: true }
  }

  const urlResult = validateUrl(url)
  if (!urlResult.valid) {
    return urlResult
  }

  // Optional: Validate platform-specific URLs
  if (platform) {
    const lowerUrl = url.toLowerCase()
    const platformLower = platform.toLowerCase()

    if (platformLower === 'github' && !lowerUrl.includes('github.com')) {
      return { valid: false, error: 'Please enter a valid GitHub URL' }
    }
    if (platformLower === 'linkedin' && !lowerUrl.includes('linkedin.com')) {
      return { valid: false, error: 'Please enter a valid LinkedIn URL' }
    }
    if (platformLower === 'twitter' && !lowerUrl.includes('twitter.com') && !lowerUrl.includes('x.com')) {
      return { valid: false, error: 'Please enter a valid Twitter/X URL' }
    }
  }

  return { valid: true }
}

