'use client'

import { navigate, scrollToSection } from '@/lib/router'
import { Mail, Phone, MapPin } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import { ArrowButton } from '@/components/ui/arrow-button'
import { Reveal } from '@/components/reveal'
import { useModals } from '@/lib/modal-context'
import { CONTACT_EMAIL } from '@/lib/send-form'

const links = [
  { href: '#top', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#industries', label: 'Industries' },
  { href: '#team', label: 'Team' },
  { href: '#contact', label: 'Contact' },
]

const serviceLinks = [
  'Generative AI',
  'RAG Applications',
  'Process Automation',
  'AI Chatbots',
  'AI Agents',
  'API Integration',
]

const footerLinkClass =
  'w-fit text-sm font-bold text-white/85 transition-all duration-300 hover:translate-x-1 hover:text-white cursor-pointer'

export function Footer() {
  const { openStrategyCall } = useModals()

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    if (window.location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        scrollToSection(href)
      }, 100)
    } else {
      scrollToSection(href)
    }
  }

  return (
    <footer className="relative px-3 pt-6 md:px-5">
      <div className="panel-blue relative mx-auto max-w-[1400px] overflow-hidden rounded-t-[2rem] px-5 pt-16 md:rounded-t-[2.75rem] md:px-10 md:pt-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <Reveal>
              <h2 className="font-sans text-5xl font-extrabold leading-[0.98] headline-tight md:text-7xl">
                Let's build
                <br />
                something <span className="text-[#a9dcff]">smart.</span>
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-white/80 md:text-base">
                Have a project in mind, or just want to talk it through? Tell us what you want to automate or build.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <ArrowButton variant="light" onClick={() => openStrategyCall()}>
                  Book a strategy call
                </ArrowButton>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2.5 break-all text-lg font-extrabold headline-tight text-white transition-opacity hover:opacity-80 md:text-2xl"
                >
                  <Mail className="size-5 shrink-0" aria-hidden="true" />
                  {CONTACT_EMAIL}
                </a>
              </div>

              <div className="mt-8 flex flex-col gap-2.5 text-sm font-semibold text-white/80">
                <a href="tel:+12157673816" className="inline-flex w-fit items-center gap-2.5 transition-colors hover:text-white">
                  <Phone className="size-4 shrink-0" aria-hidden="true" />
                  +1 (215) 767-3816
                </a>
                <span className="inline-flex items-center gap-2.5">
                  <MapPin className="size-4 shrink-0" aria-hidden="true" />
                  1608 Spruce Street, Philadelphia, PA 19103
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="grid grid-cols-2 gap-8 lg:pt-4">
              <nav aria-label="Footer navigation" className="flex flex-col gap-3">
                <p className="mb-1 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/55">Explore</p>
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={footerLinkClass}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <nav aria-label="Services" className="flex flex-col gap-3">
                <p className="mb-1 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/55">Services</p>
                {serviceLinks.map((label) => (
                  <a
                    key={label}
                    href="#services"
                    onClick={(e) => handleLinkClick(e, '#services')}
                    className={footerLinkClass}
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </Reveal>
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs font-semibold text-white/70 sm:flex-row sm:items-center sm:justify-between md:mt-20">
            <a
              href="#top"
              onClick={(e) => handleLinkClick(e, '#top')}
              className="w-fit transition-opacity hover:opacity-85"
              aria-label="VibeAgentic home"
            >
              <BrandLogo size={32} tone="white" />
            </a>
            <p>&copy; {new Date().getFullYear()} VibeAgentic AI. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => navigate('/privacy-policy')}
                className="transition-colors hover:text-white cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => navigate('/terms-conditions')}
                className="transition-colors hover:text-white cursor-pointer"
              >
                Terms & Conditions
              </button>
            </div>
          </div>
        </div>

        {/* Giant watermark wordmark */}
        <div
          aria-hidden="true"
          className="pointer-events-none mx-auto -mb-[0.2em] mt-6 select-none whitespace-nowrap bg-gradient-to-b from-white/25 to-white/0 bg-clip-text text-center font-sans text-[16.5vw] font-extrabold leading-[0.9] tracking-[-0.05em] text-transparent min-[1400px]:text-[230px]"
        >
          VibeAgentic
        </div>
      </div>
    </footer>
  )
}
