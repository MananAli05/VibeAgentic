'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import {
  BarChart3,
  BookOpen,
  Bot,
  CalendarCheck,
  Check,
  Database,
  Inbox,
  LayoutDashboard,
  Loader2,
  Plug,
  Workflow,
} from 'lucide-react'
import { useModals } from '@/lib/modal-context'
import { scrollToSection } from '@/lib/router'
import { ArrowButton } from '@/components/ui/arrow-button'
import { Reveal } from '@/components/reveal'
import { BrandMark } from '@/components/brand-logo'
import * as React from 'react'

const technologies = [
  { name: 'OpenAI', logo: '/tech-logos/openai.svg', color: '#10A37F', width: 104 },
  { name: 'Anthropic (Claude)', logo: '/tech-logos/anthropic.svg', color: '#D97757', width: 120 },
  { name: 'Meta', logo: '/tech-logos/meta.svg', color: '#0866FF', width: 100 },
  { name: 'FastAPI', logo: '/tech-logos/fastapi.svg', color: '#009688', width: 112 },
  { name: 'Supabase', logo: '/tech-logos/supabase.svg', color: '#3ECF8E', width: 118 },
  { name: 'LangGraph', logo: '/tech-logos/langgraph.svg', color: '#1FC7A6', width: 118 },
  { name: 'Pinecone', logo: '/tech-logos/pinecone.svg', color: '#00B386', width: 124 },
  { name: 'n8n', logo: '/tech-logos/n8n.svg', color: '#EA4B71', width: 82 },
]

const serviceChips = [
  'Generative AI Integration',
  'RAG Applications',
  'AI Process Automation',
  'Custom AI Chatbots',
  'AI Copilots & Assistants',
  'LLM Tuning & Training',
  'Autonomous AI Agents',
  'Enterprise API Integration',
]

const highlights = ['Custom AI agents', 'Workflow automation', 'Enterprise integrations']

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Overview' },
  { icon: Bot, label: 'Agents' },
  { icon: Workflow, label: 'Workflows', active: true },
  { icon: BookOpen, label: 'Knowledge Base' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Plug, label: 'Integrations' },
]

const pipeline = [
  { icon: Inbox, title: 'New enquiry received', meta: 'Website chat · WhatsApp' },
  { icon: Bot, title: 'AI agent qualifies the lead', meta: 'Intent, budget and timeline extracted' },
  { icon: Database, title: 'CRM record updated', meta: 'Contact and deal created' },
  { icon: CalendarCheck, title: 'Follow-up booked', meta: 'Calendar invite sent' },
]

const channels = [
  { label: 'Web chat', value: 48 },
  { label: 'WhatsApp', value: 27 },
  { label: 'Email', value: 16 },
  { label: 'Slack', value: 9 },
]

const chartLine = 'M0 62 C22 58 34 44 56 46 S92 30 114 34 150 18 172 20 208 6 240 8'

/** Product-style preview: a sample agent console with a workflow run stepping through its stages. */
function ConsoleMock() {
  const reduced = useReducedMotion()
  // 0..3 = that step is running, 4 = run complete (held briefly before the loop restarts)
  const [stage, setStage] = useState(reduced ? pipeline.length : 0)

  useEffect(() => {
    if (reduced) return
    const id = window.setTimeout(
      () => setStage((s) => (s >= pipeline.length ? 0 : s + 1)),
      stage >= pipeline.length ? 2600 : 1500
    )
    return () => window.clearTimeout(id)
  }, [stage, reduced])

  return (
    <div
      className="overflow-hidden rounded-2xl border border-foreground/10 bg-white text-left shadow-[0_50px_100px_-40px_rgba(11,63,196,0.45),0_2px_6px_rgba(11,26,51,0.06)] md:rounded-3xl"
      role="img"
      aria-label="Sample VibeAgentic agent console showing a lead qualification workflow running"
    >
      {/* Window bar */}
      <div className="flex items-center gap-3 border-b border-foreground/[0.07] bg-[#f7faff] px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
        </span>
        <span className="mx-auto truncate rounded-md border border-foreground/[0.07] bg-white px-3 py-1 text-[11px] font-semibold text-muted-foreground">
          Agent Console · sample workspace
        </span>
        <span className="hidden items-center gap-1.5 text-[11px] font-bold text-emerald-600 sm:flex">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Operational
        </span>
      </div>

      <div className="grid md:grid-cols-[190px_1fr] lg:grid-cols-[200px_1fr_290px]">
        {/* Sidebar */}
        <aside className="hidden flex-col border-r border-foreground/[0.07] bg-[#fafcff] p-3 md:flex">
          <div className="mb-4 flex items-center gap-2 px-2 pt-1">
            <BrandMark className="size-5" />
            <span className="text-sm font-extrabold tracking-tight text-foreground">VibeAgentic<span className="text-primary">AI</span></span>
          </div>
          {sidebarItems.map(({ icon: Icon, label, active }) => (
            <span
              key={label}
              className={`mb-0.5 flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-semibold ${
                active ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon className="size-4" strokeWidth={2} aria-hidden="true" />
              {label}
            </span>
          ))}
        </aside>

        {/* Workflow run */}
        <div className="p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Workflow</p>
              <p className="mt-0.5 text-base font-extrabold tracking-tight text-foreground sm:text-lg">
                Lead qualification
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary">
              <span className="pulse-dot size-1.5 rounded-full bg-primary" />
              Live run
            </span>
          </div>

          <ol className="mt-5">
            {pipeline.map(({ icon: Icon, title, meta }, i) => {
              const done = i < stage
              const running = i === stage
              return (
                <li key={title} className="relative flex gap-3.5 pb-4 last:pb-0">
                  {i < pipeline.length - 1 && (
                    <span className="absolute left-[17px] top-9 h-[calc(100%-36px)] w-px bg-foreground/10" aria-hidden="true">
                      <span
                        className="block w-full origin-top bg-primary transition-transform duration-700 ease-out"
                        style={{ height: '100%', transform: `scaleY(${done ? 1 : 0})` }}
                      />
                    </span>
                  )}
                  <span
                    className={`relative z-10 flex size-9 shrink-0 items-center justify-center rounded-xl border transition-colors duration-500 ${
                      done
                        ? 'border-primary bg-primary text-white'
                        : running
                          ? 'border-primary/40 bg-primary/10 text-primary'
                          : 'border-foreground/10 bg-white text-muted-foreground'
                    }`}
                  >
                    <Icon className="size-4" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <div
                    className={`flex min-w-0 flex-1 items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 transition-all duration-500 ${
                      running ? 'border-primary/30 bg-primary/[0.04] shadow-[0_8px_24px_-14px_rgba(22,103,242,0.6)]' : 'border-foreground/[0.07] bg-white'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-bold text-foreground">{title}</p>
                      <p className="truncate text-[11px] text-muted-foreground">{meta}</p>
                    </div>
                    <span
                      className={`flex shrink-0 items-center gap-1 text-[11px] font-bold ${
                        done ? 'text-emerald-600' : running ? 'text-primary' : 'text-muted-foreground/60'
                      }`}
                    >
                      {done ? (
                        <>
                          <Check className="size-3.5" strokeWidth={3} aria-hidden="true" /> Done
                        </>
                      ) : running ? (
                        <>
                          <Loader2 className="size-3.5 animate-spin" aria-hidden="true" /> Running
                        </>
                      ) : (
                        'Queued'
                      )}
                    </span>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Metrics */}
        <aside className="hidden flex-col gap-3 border-l border-foreground/[0.07] bg-[#fafcff] p-4 lg:flex">
          <div className="rounded-xl border border-foreground/[0.07] bg-white p-4">
            <p className="text-[11px] font-bold text-muted-foreground">Enquiries handled</p>
            <div className="mt-1 flex items-end justify-between">
              <p className="text-2xl font-extrabold tracking-tight text-foreground">1,284</p>
              <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600">+18%</span>
            </div>
            <svg viewBox="0 0 240 70" fill="none" className="mt-3 w-full" aria-hidden="true">
              <defs>
                <linearGradient id="hero-chart-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1667f2" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#1667f2" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                d={`${chartLine} L240 70 L0 70 Z`}
                fill="url(#hero-chart-fill)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.6 }}
              />
              <motion.path
                d={chartLine}
                stroke="#1667f2"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>
          </div>

          <div className="rounded-xl border border-foreground/[0.07] bg-white p-4">
            <p className="text-[11px] font-bold text-muted-foreground">By channel</p>
            <ul className="mt-3 flex flex-col gap-2.5">
              {channels.map((channel, i) => (
                <li key={channel.label} className="grid grid-cols-[68px_1fr_30px] items-center gap-2 text-[11px] font-semibold text-foreground/80">
                  {channel.label}
                  <span className="h-1.5 overflow-hidden rounded-full bg-tint">
                    <motion.span
                      className="block h-full rounded-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${channel.value}%` }}
                      transition={{ duration: 0.9, delay: 1.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </span>
                  <span className="text-right text-muted-foreground">{channel.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { openStartProject } = useModals()
  const reduced = useReducedMotion()

  // The console starts tilted back and settles flat as the page scrolls
  const { scrollY } = useScroll()
  const rotateX = useTransform(scrollY, [0, 520], [reduced ? 0 : 14, 0])
  const scale = useTransform(scrollY, [0, 520], [reduced ? 1 : 0.94, 1])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(
        '[data-hero-line]',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 },
        0.1
      )
        .fromTo('[data-hero-sub]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')
        .fromTo(
          '[data-hero-cta]',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          '-=0.35'
        )
        .fromTo('[data-hero-visual]', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.1 }, 0.45)
        .fromTo('[data-hero-chips]', { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.5')
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="top" className="relative overflow-hidden px-5 pt-36 md:px-8 md:pt-44">
      {/* Subtle grid + glow backdrop */}
      <div className="hero-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[820px]" />
      <div className="pointer-events-none absolute left-1/2 top-[-180px] -z-10 h-[520px] w-[min(1100px,120vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(46,175,255,0.3),transparent)]" />

      <div className="mx-auto max-w-5xl text-center">
        <h1 className="font-sans text-[clamp(2.4rem,13vw,3.3rem)] font-extrabold leading-[0.98] headline-tight sm:text-7xl lg:text-[6.5rem]">
          <span data-hero-line className="block text-[#9bb4dc]">Dream It.</span>
          <span data-hero-line className="block text-foreground">
            We Will <span className="gradient-brand-text">AI It.</span>
          </span>
        </h1>

        <p
          data-hero-sub
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg text-pretty"
        >
          We build smart AI software, automation systems, chatbots, and business tools that help companies work
          faster and smarter.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <span data-hero-cta>
            <ArrowButton onClick={() => openStartProject()}>Start a Project</ArrowButton>
          </span>
          <span data-hero-cta>
            <ArrowButton
              variant="outline"
              href="#services"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                scrollToSection('#services')
              }}
            >
              Our Services
            </ArrowButton>
          </span>
        </div>

        <ul
          data-hero-cta
          className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-muted-foreground"
        >
          {highlights.map((item) => (
            <li key={item} className="inline-flex items-center gap-1.5">
              <Check className="size-3.5 text-primary" strokeWidth={3} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Product preview */}
      <div data-hero-visual className="relative mx-auto mt-14 max-w-6xl md:mt-20 [perspective:1800px]">
        <div className="pointer-events-none absolute inset-x-[8%] -top-10 bottom-10 -z-10 rounded-[3rem] bg-primary/25 blur-3xl" />
        <motion.div style={{ rotateX, scale, transformOrigin: '50% 0%' }}>
          <ConsoleMock />
        </motion.div>
      </div>

      {/* Service chip marquee */}
      <div data-hero-chips className="marquee mx-auto mt-12 max-w-7xl pb-6 md:mt-16" aria-hidden="true">
        <div className="marquee-track gap-3 pr-3">
          {[...serviceChips, ...serviceChips].map((chip, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-full border border-primary/15 bg-white px-5 py-2.5 text-xs font-bold text-foreground/75 shadow-[0_8px_20px_-12px_rgba(22,103,242,0.4)]"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TechStack() {
  return (
    <section className="relative px-5 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-sans text-3xl font-extrabold headline-tight text-foreground md:text-4xl">
            Built with Industry-Leading AI Technologies
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            We build intelligent AI products using trusted enterprise technologies and modern AI infrastructure.
          </p>
        </Reveal>

        <Reveal
          variant="zoom-in"
          stagger="[data-tech]"
          staggerSpeed={0.06}
          className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
        >
          {technologies.map((technology) => (
            <div
              key={technology.name}
              data-tech
              className="tech-logo-tile card-soft flex min-h-[120px] flex-col items-center justify-center gap-4 rounded-3xl px-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
              style={{ '--brand-color': technology.color } as React.CSSProperties}
            >
              <span
                className="tech-logo-mark max-w-full"
                style={{
                  '--logo-url': `url(${technology.logo})`,
                  '--logo-width': `${technology.width}px`,
                } as React.CSSProperties}
                role="img"
                aria-label={`${technology.name} logo`}
              />
              <span className="text-xs font-bold text-muted-foreground">{technology.name}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
