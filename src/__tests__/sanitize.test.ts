import { describe, it, expect } from 'vitest'
import { sanitizeUrl, isExternalUrl } from '../lib/sanitize'

describe('sanitizeUrl', () => {
  it('returns "#" for null/undefined/empty input', () => {
    expect(sanitizeUrl(null)).toBe('#')
    expect(sanitizeUrl(undefined)).toBe('#')
    expect(sanitizeUrl('')).toBe('#') // empty string is treated as falsy → safe default
  })

  it('allows hash links', () => {
    expect(sanitizeUrl('#')).toBe('#')
    expect(sanitizeUrl('#contact')).toBe('#contact')
    expect(sanitizeUrl('#section-hero')).toBe('#section-hero')
  })

  it('allows relative URLs starting with /', () => {
    expect(sanitizeUrl('/about')).toBe('/about')
    expect(sanitizeUrl('/dashboard')).toBe('/dashboard')
  })

  it('allows http and https URLs', () => {
    expect(sanitizeUrl('https://example.com')).toBe('https://example.com')
    expect(sanitizeUrl('http://example.com')).toBe('http://example.com')
    expect(sanitizeUrl('https://github.com/user/repo')).toBe('https://github.com/user/repo')
  })

  it('allows mailto URLs', () => {
    expect(sanitizeUrl('mailto:test@example.com')).toBe('mailto:test@example.com')
  })

  it('blocks javascript: protocol (XSS prevention)', () => {
    expect(sanitizeUrl('javascript:alert(1)')).toBe('#')
    expect(sanitizeUrl('javascript:void(0)')).toBe('#')
    expect(sanitizeUrl('JAVASCRIPT:alert(1)')).toBe('#')
  })

  it('blocks data: protocol', () => {
    expect(sanitizeUrl('data:text/html,<script>alert(1)</script>')).toBe('#')
  })

  it('blocks vbscript: protocol', () => {
    expect(sanitizeUrl('vbscript:msgbox("xss")')).toBe('#')
  })

  it('handles URLs with whitespace', () => {
    expect(sanitizeUrl('  https://example.com  ')).toBe('https://example.com')
    expect(sanitizeUrl('  javascript:alert(1)  ')).toBe('#')
  })

  it('allows simple text without protocol (treated as relative)', () => {
    expect(sanitizeUrl('contact')).toBe('contact')
    expect(sanitizeUrl('about-me')).toBe('about-me')
  })
})

describe('isExternalUrl', () => {
  it('returns false for null/undefined', () => {
    expect(isExternalUrl(null)).toBe(false)
    expect(isExternalUrl(undefined)).toBe(false)
  })

  it('returns true for http/https URLs', () => {
    expect(isExternalUrl('https://example.com')).toBe(true)
    expect(isExternalUrl('http://example.com')).toBe(true)
  })

  it('returns false for hash links and relative URLs', () => {
    expect(isExternalUrl('#contact')).toBe(false)
    expect(isExternalUrl('/about')).toBe(false)
    expect(isExternalUrl('mailto:test@test.com')).toBe(false)
  })
})
