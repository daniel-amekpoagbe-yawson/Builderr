import { describe, it, expect } from 'vitest'
import { validateUrl, validateEmail, validateLength, validatePhone, validateSocialUrl } from '../lib/validation'

describe('validateUrl', () => {
  it('returns valid for empty non-required field', () => {
    expect(validateUrl('')).toEqual({ valid: true })
    expect(validateUrl('', false)).toEqual({ valid: true })
  })

  it('returns invalid for empty required field', () => {
    expect(validateUrl('', true)).toEqual({ valid: false, error: 'URL is required' })
  })

  it('allows hash links', () => {
    expect(validateUrl('#contact')).toEqual({ valid: true })
  })

  it('validates correct URLs', () => {
    expect(validateUrl('https://example.com')).toEqual({ valid: true })
    expect(validateUrl('http://localhost:3000')).toEqual({ valid: true })
  })

  it('rejects invalid URLs', () => {
    const result = validateUrl('not a url')
    expect(result.valid).toBe(false)
    expect(result.error).toBeDefined()
  })
})

describe('validateEmail', () => {
  it('returns valid for empty non-required field', () => {
    expect(validateEmail('')).toEqual({ valid: true })
  })

  it('returns invalid for empty required field', () => {
    expect(validateEmail('', true)).toEqual({ valid: false, error: 'Email is required' })
  })

  it('validates correct emails', () => {
    expect(validateEmail('test@example.com')).toEqual({ valid: true })
    expect(validateEmail('user.name@domain.co')).toEqual({ valid: true })
  })

  it('rejects invalid emails', () => {
    expect(validateEmail('not-an-email').valid).toBe(false)
    expect(validateEmail('missing@domain').valid).toBe(false)
    expect(validateEmail('@no-user.com').valid).toBe(false)
  })
})

describe('validateLength', () => {
  it('returns valid for empty non-required field', () => {
    expect(validateLength('')).toEqual({ valid: true })
  })

  it('returns invalid for empty required field', () => {
    const result = validateLength('', { required: true, fieldName: 'Name' })
    expect(result.valid).toBe(false)
    expect(result.error).toContain('Name')
  })

  it('validates minimum length', () => {
    expect(validateLength('ab', { min: 3 }).valid).toBe(false)
    expect(validateLength('abc', { min: 3 }).valid).toBe(true)
  })

  it('validates maximum length', () => {
    expect(validateLength('abcdef', { max: 5 }).valid).toBe(false)
    expect(validateLength('abcde', { max: 5 }).valid).toBe(true)
  })
})

describe('validatePhone', () => {
  it('returns valid for empty non-required field', () => {
    expect(validatePhone('')).toEqual({ valid: true })
  })

  it('validates correct phone numbers', () => {
    expect(validatePhone('+1 (555) 123-4567')).toEqual({ valid: true })
    expect(validatePhone('1234567890')).toEqual({ valid: true })
  })

  it('rejects invalid phone numbers', () => {
    expect(validatePhone('abc').valid).toBe(false)
    expect(validatePhone('123').valid).toBe(false) // Too short
  })
})

describe('validateSocialUrl', () => {
  it('returns valid for empty field', () => {
    expect(validateSocialUrl('')).toEqual({ valid: true })
  })

  it('validates GitHub URLs', () => {
    expect(validateSocialUrl('https://github.com/user', 'github')).toEqual({ valid: true })
    expect(validateSocialUrl('https://example.com', 'github').valid).toBe(false)
  })

  it('validates LinkedIn URLs', () => {
    expect(validateSocialUrl('https://linkedin.com/in/user', 'linkedin')).toEqual({ valid: true })
    expect(validateSocialUrl('https://example.com', 'linkedin').valid).toBe(false)
  })

  it('validates Twitter URLs', () => {
    expect(validateSocialUrl('https://twitter.com/user', 'twitter')).toEqual({ valid: true })
    expect(validateSocialUrl('https://x.com/user', 'twitter')).toEqual({ valid: true })
  })
})
