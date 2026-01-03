import * as React from 'react'
import { Input } from './input'
import { cn } from '@/lib/utils'

interface InputWithCounterProps extends React.ComponentProps<'input'> {
  maxLength?: number
  showCounter?: boolean
  error?: string
}

export function InputWithCounter({
  className,
  maxLength,
  showCounter = true,
  error,
  value,
  ...props
}: InputWithCounterProps) {
  const length = typeof value === 'string' ? value.length : 0
  const isNearLimit = maxLength && length > maxLength * 0.9

  return (
    <div className="space-y-1">
      <div className="relative">
        <Input
          className={cn(error && 'border-red-500', className)}
          maxLength={maxLength}
          value={value}
          aria-invalid={error ? 'true' : undefined}
          {...props}
        />
        {showCounter && maxLength && (
          <div
            className={cn(
              'absolute right-2 top-1/2 -translate-y-1/2 text-xs',
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

