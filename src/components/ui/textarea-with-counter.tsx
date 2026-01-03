import * as React from 'react'
import { Textarea } from './textarea'
import { cn } from '@/lib/utils'

interface TextareaWithCounterProps extends React.ComponentProps<'textarea'> {
  maxLength?: number
  showCounter?: boolean
  error?: string
}

export function TextareaWithCounter({
  className,
  maxLength,
  showCounter = true,
  error,
  value,
  ...props
}: TextareaWithCounterProps) {
  const length = typeof value === 'string' ? value.length : 0
  const isNearLimit = maxLength && length > maxLength * 0.9

  return (
    <div className="space-y-1">
      <div className="relative">
        <Textarea
          className={cn(error && 'border-red-500', className)}
          maxLength={maxLength}
          value={value}
          aria-invalid={error ? 'true' : undefined}
          {...props}
        />
        {showCounter && maxLength && (
          <div
            className={cn(
              'absolute bottom-2 right-2 text-xs',
              isNearLimit ? 'text-orange-500' : 'text-gray-400'
            )}
          >
            {length}/{maxLength}
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-600 flex items-center gap-1">
          <span>⚠</span>
          {error}
        </p>
      )}
    </div>
  )
}

