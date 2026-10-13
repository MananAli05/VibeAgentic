'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navigate, scrollToSection } from '@/lib/router'
import { useModals } from '@/lib/modal-context'
import { BrandLogo } from '@/components/brand-logo'
import { ArrowButton } from '@/components/ui/arrow-button'
import * as React from 'react'

const links = [
  { href: '#top', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#industries', label: 'Industries' },
  { href: '#team', label: 'Team' },
  { href: '#contact', label: 'Contact' },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { openStrategyCall } = useModals()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    // If user refreshes or loads page with a hash like #contact, scroll and clean URL
    if (window.location.hash) {
      const hash = window.location.hash
      setTimeout(() => {
        scrollToSection(hash)
      }, 100)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  // Hover-to-open for mouse users; a short close delay lets the cursor cross the gap to the dropdown
  const closeTimer = useRef<number | undefined>(undefined)
  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    window.clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    closeTimer.current = window.setTimeout(() => setOpen(false), 220)
  }
  useEffect(() => () => window.clearTimeout(closeTimer.current), [])

  const handleMenuClick = () => {
    // With a mouse the menu is already open from hover, so a click should not toggle it shut
    if (window.matchMedia('(hover: hover)').matches) setOpen(true)
    else setOpen((v) => !v)
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setOpen(false)
    if (window.location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        scrollToSection(href)
      }, 100)
    } else {
      scrollToSection(href)
    }
  }

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (window.location.pathname !== '/') {
      navigate('/')
    } else {
      scrollToSection('#top')
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-foreground/[0.06] bg-background/80 py-2.5 backdrop-blur-md' : 'bg-transparent py-4'
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 md:px-8"
      >
        <a
          href="#top"
          onClick={handleLogoClick}
          className="shrink-0 transition-opacity hover:opacity-85"
          aria-label="VibeAgentic home"
        >
          <span className="hidden sm:block"><BrandLogo size={34} /></span>
          <span className="sm:hidden"><BrandLogo size={28} /></span>
        </a>

        {/* Floating menu pill + dropdown */}
        <div
          ref={menuRef}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          className="md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
        >
          <div className="flex items-center gap-4 rounded-2xl border border-foreground/[0.07] bg-white py-1.5 pl-1.5 pr-1.5 shadow-[0_10px_30px_-14px_rgba(22,103,242,0.4)] sm:pr-4">
            <button
              type="button"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={handleMenuClick}
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-foreground transition-colors hover:bg-tint cursor-pointer"
            >
              {open ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
              {open ? 'Close' : 'Menu'}
            </button>
            <span className="hidden items-center gap-2 text-xs font-bold text-foreground/75 sm:inline-flex">
              <span className="pulse-dot size-2 rounded-full bg-sky-brand" />
              Taking New Projects
            </span>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                id="site-menu"
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-5 top-full mt-2 w-[min(20rem,calc(100vw-2.5rem))] origin-top rounded-3xl border border-foreground/[0.07] bg-white p-3 shadow-[0_30px_70px_-24px_rgba(22,103,242,0.55)] md:left-1/2 md:right-auto md:-translate-x-1/2"
              >
                <ul className="flex flex-col">
                  {links.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.03 * i + 0.05, duration: 0.25 }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className="block rounded-2xl px-4 py-2 text-center text-2xl font-bold headline-tight text-foreground/55 transition-colors hover:bg-tint hover:text-primary"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-2 border-t border-foreground/[0.07] pt-3 md:hidden">
                  <ArrowButton
                    className="w-full"
                    onClick={() => {
                      setOpen(false)
                      openStrategyCall()
                    }}
                  >
                    Book a Strategy Call
                  </ArrowButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="hidden md:block">
          <ArrowButton size="sm" onClick={() => openStrategyCall()}>
            Book a Call
          </ArrowButton>
        </div>
      </nav>
    </header>
  )
}
