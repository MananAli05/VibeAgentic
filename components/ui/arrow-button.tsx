import * as React from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'light' | 'outline'

const variants: Record<Variant, { root: string; chip: string }> = {
  primary: {
    root: 'bg-primary text-white shadow-[0_14px_30px_-12px_rgba(22,103,242,0.7)] hover:bg-[#0f57d8]',
    chip: 'bg-white text-primary',
  },
  light: {
    root: 'bg-white text-foreground shadow-[0_14px_30px_-14px_rgba(11,26,51,0.45)] hover:bg-[#f1f6ff]',
    chip: 'bg-primary text-white',
  },
  outline: {
    root: 'border border-foreground/15 bg-white/60 text-foreground hover:border-primary/50 hover:bg-white',
    chip: 'bg-tint text-primary',
  },
}

interface BaseProps {
  variant?: Variant
  size?: 'sm' | 'md'
  className?: string
  children: React.ReactNode
}

type ArrowButtonProps = BaseProps &
  (
    | ({ href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps>)
    | ({ href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>)
  )

/** Pill button with a square arrow chip on the left that nudges forward on hover. */
export function ArrowButton({ variant = 'primary', size = 'md', className, children, ...props }: ArrowButtonProps) {
  const v = variants[variant]
  const classes = cn(
    'group inline-flex items-center gap-3 rounded-2xl font-bold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer',
    size === 'sm' ? 'p-1.5 pr-4 text-xs' : 'p-2 pr-6 text-sm',
    v.root,
    className
  )
  const inner = (
    <>
      <span
        className={cn(
          'flex shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:translate-x-0.5',
          size === 'sm' ? 'size-7' : 'size-9',
          v.chip
        )}
      >
        <ChevronRight className="size-4" strokeWidth={2.6} aria-hidden="true" />
      </span>
      <span>{children}</span>
    </>
  )

  if (props.href !== undefined) {
    return (
      <a className={classes} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {inner}
      </a>
    )
  }
  return (
    <button type="button" className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {inner}
    </button>
  )
}
