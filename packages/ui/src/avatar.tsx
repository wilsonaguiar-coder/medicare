import * as React from 'react'

interface AvatarProps {
  src?: string
  name: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = { sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm', lg: 'h-14 w-14 text-base' }

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export function Avatar({ src, name, size = 'md', className = '' }: AvatarProps) {
  const sizeClass = sizeClasses[size]

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={['rounded-full object-cover', sizeClass, className].join(' ')}
      />
    )
  }

  return (
    <div
      className={[
        'flex items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700',
        sizeClass,
        className,
      ].join(' ')}
      aria-label={name}
    >
      {getInitials(name)}
    </div>
  )
}
