import * as React from 'react'

/**
 * VibeAgentic AI emblem (orbit rings around the growth-chart core).
 * `tone="white"` sits the emblem on a white rounded tile so it stays crisp on blue panels.
 */
export function BrandMark({
  className,
  style,
  tone = 'color',
}: {
  className?: string
  style?: React.CSSProperties
  tone?: 'color' | 'white'
}) {
  const img = (
    <img
      src="/logo-mark-sm.png"
      alt=""
      aria-hidden="true"
      draggable={false}
      decoding="async"
      className={tone === 'white' ? 'block shrink-0 object-contain' : className}
      style={tone === 'white' ? { width: '82%', height: '82%', minWidth: 0 } : style}
    />
  )
  if (tone !== 'white') return img
  return (
    <span
      className={`inline-flex items-center justify-center rounded-[28%] bg-white shadow-sm ${className ?? ''}`}
      style={style}
    >
      {img}
    </span>
  )
}

/** Full VibeAgentic AI logo: emblem + wordmark. `size` is the px height of the emblem; `tone="white"` is for blue panels. */
export function BrandLogo({
  size = 40,
  className,
  tone = 'color',
}: {
  size?: number
  className?: string
  tone?: 'color' | 'white'
}) {
  const white = tone === 'white'
  return (
    <span
      className={`inline-flex items-center select-none ${className ?? ''}`}
      style={{ height: size, gap: size * 0.24 }}
    >
      <BrandMark tone={tone} className="shrink-0" style={{ width: size, height: size }} />
      <span
        className="font-sans font-extrabold leading-none tracking-[-0.03em] whitespace-nowrap"
        style={{ fontSize: size * 0.52 }}
      >
        <span className={white ? 'text-white' : 'text-[#050b2e]'}>VibeAgentic</span>
        <span className={white ? 'text-[#bfe3ff]' : 'text-[#0a66ff]'}>AI</span>
      </span>
    </span>
  )
}
