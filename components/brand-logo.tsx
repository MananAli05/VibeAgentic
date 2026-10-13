import * as React from 'react'

/** VibeAgentic "V" mark: a gradient V with a pulse wave running through it and an agent node. */
export function BrandMark({ className, tone = 'color' }: { className?: string; tone?: 'color' | 'white' }) {
  const id = React.useId()
  const white = tone === 'white'
  const cut = white ? '#1667f2' : '#ffffff'
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={`${id}-g`} x1="4" y1="6" x2="44" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2EAFFF" />
          <stop offset="100%" stopColor="#1667F2" />
        </linearGradient>
      </defs>
      <path
        d="M5 8h9.5L24 31.5 33.5 8H43L28.6 41.5a5 5 0 0 1-9.2 0L5 8Z"
        fill={white ? '#ffffff' : `url(#${id}-g)`}
      />
      <path
        d="M9 22h7l2.5-5 4 10 3-7 2 3H39"
        stroke={cut}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="39" cy="23" r="3.2" fill={white ? '#ffffff' : '#2EAFFF'} stroke={cut} strokeWidth="1.6" />
    </svg>
  )
}

/** Full VibeAgentic logo: mark + wordmark. `size` is the px height of the mark; `tone="white"` is for blue panels. */
export function BrandLogo({
  size = 40,
  className,
  tone = 'color',
}: {
  size?: number
  className?: string
  tone?: 'color' | 'white'
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 select-none ${className ?? ''}`}
      style={{ height: size }}
    >
      <BrandMark tone={tone} className="h-full w-auto shrink-0" />
      <span
        className="font-sans font-extrabold leading-none tracking-tight"
        style={{ fontSize: size * 0.62 }}
      >
        {tone === 'white' ? (
          <span className="text-white">VibeAgentic</span>
        ) : (
          <>
            <span className="text-primary">Vibe</span>
            <span className="text-foreground">Agentic</span>
          </>
        )}
      </span>
    </span>
  )
}
