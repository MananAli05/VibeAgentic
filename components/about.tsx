'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, motion, MotionValue, useInView, useScroll, useTransform } from 'framer-motion'
import { Bot, Check, Database, FileText } from 'lucide-react'
import * as React from 'react'

const ease = [0.22, 1, 0.36, 1] as const

const headingLead = "We don't just talk about AI."
const headingAccent = 'We build systems that work.'

const facts = [
  { value: '8', label: 'AI service lines' },
  { value: '6', label: 'Industries served' },
  { value: '4', label: 'Step delivery process' },
]

/** Heading whose words rise into place one after another when scrolled into view. */
function RisingHeading() {
  const ref = useRef<HTMLHeadingElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const words = [
    ...headingLead.split(' ').map((w) => ({ w, accent: false })),
    ...headingAccent.split(' ').map((w) => ({ w, accent: true })),
  ]

  return (
    <h2
      ref={ref}
      aria-label={`${headingLead} ${headingAccent}`}
      className="font-sans text-4xl font-extrabold leading-[1.04] headline-tight sm:text-5xl lg:text-[4.4rem]"
    >
      {words.map(({ w, accent }, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${accent ? 'gradient-brand-text' : 'text-foreground'}`}
            initial={{ y: '110%' }}
            animate={inView ? { y: '0%' } : undefined}
            transition={{ duration: 0.8, delay: i * 0.055, ease }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </h2>
  )
}

/** Small network of nodes with signals travelling between the layers. */
function ModelVisual() {
  const layers = [
    { x: 40, ys: [50, 110, 170] },
    { x: 150, ys: [30, 85, 140, 195] },
    { x: 260, ys: [60, 110, 160] },
    { x: 350, ys: [110] },
  ]
  const links: string[] = []
  for (let l = 0; l < layers.length - 1; l++) {
    for (const y1 of layers[l].ys) {
      for (const y2 of layers[l + 1].ys) {
        links.push(`M${layers[l].x} ${y1} L${layers[l + 1].x} ${y2}`)
      }
    }
  }
  const signals = [links[1], links[6], links[14], links[20], links[24], links[9]]

  return (
    <svg viewBox="0 0 390 225" fill="none" className="w-full" aria-hidden="true">
      {links.map((d) => (
        <path key={d} d={d} stroke="white" strokeOpacity="0.16" strokeWidth="1" />
      ))}
      {signals.map((d, i) => (
        <circle key={d} r="3.2" fill="white">
          <animateMotion dur={`${1.8 + (i % 3) * 0.5}s`} begin={`${i * 0.45}s`} repeatCount="indefinite" path={d} />
        </circle>
      ))}
      {layers.map((layer, l) =>
        layer.ys.map((y) => (
          <circle
            key={`${layer.x}-${y}`}
            cx={layer.x}
            cy={y}
            r={l === layers.length - 1 ? 13 : 8}
            fill={l === layers.length - 1 ? '#ffffff' : '#1667f2'}
            stroke="white"
            strokeWidth="2.5"
          />
        ))
      )}
    </svg>
  )
}

const flowSteps = [
  { icon: FileText, label: 'Documents' },
  { icon: Bot, label: 'AI agent' },
  { icon: Database, label: 'CRM / ERP' },
]

/** Three connected stages with dashes marching along the connectors. */
function FlowVisual() {
  return (
    <div className="flex w-full items-center justify-between">
      {flowSteps.map(({ icon: Icon, label }, i) => (
        <React.Fragment key={label}>
          {i > 0 && (
            <svg viewBox="0 0 80 12" fill="none" className="mx-1 h-3 min-w-3 flex-1 text-primary" aria-hidden="true" preserveAspectRatio="none">
              <path
                d="M0 6h80"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="5 7"
                style={{ animation: 'dash-march 1.2s linear infinite' }}
              />
            </svg>
          )}
          <div className="flex min-w-0 flex-col items-center gap-2.5">
            <span className="relative flex size-12 items-center justify-center rounded-2xl border border-primary/15 bg-white text-primary shadow-[0_14px_30px_-16px_rgba(22,103,242,0.6)] sm:size-[4.5rem]">
              <Icon className="size-6 sm:size-7" strokeWidth={1.8} aria-hidden="true" />
              <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-primary text-white">
                <Check className="size-3" strokeWidth={3.5} aria-hidden="true" />
              </span>
            </span>
            <span className="whitespace-nowrap text-[11px] font-bold text-foreground/75 sm:text-xs">{label}</span>
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

/** Tick-mark ring that fills and counts up when scrolled into view. */
function AccuracyRing({ value = 98.7 }: { value?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [current, setCurrent] = useState(0)
  const ticks = 48

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.8,
      ease,
      onUpdate: (v) => setCurrent(v),
    })
    return () => controls.stop()
  }, [inView, value])

  const lit = Math.round((current / 100) * ticks)

  return (
    <div ref={ref} className="relative size-44 shrink-0 sm:size-52">
      <svg viewBox="0 0 160 160" className="size-full" aria-hidden="true">
        {Array.from({ length: ticks }).map((_, i) => (
          <line
            key={i}
            x1="80"
            y1="8"
            x2="80"
            y2="24"
            strokeWidth="3.5"
            strokeLinecap="round"
            stroke={i < lit ? '#1667f2' : '#c9dcf7'}
            transform={`rotate(${(360 / ticks) * i} 80 80)`}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-sans text-4xl font-extrabold headline-tight text-foreground">
          {current.toFixed(1)}
          <span className="text-lg text-muted-foreground">%</span>
        </span>
        <span className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Accuracy
        </span>
      </div>
    </div>
  )
}

const pillars = [
  {
    title: 'Custom AI Models',
    desc: 'Fine-tuned LLMs trained on your business data and industry logic.',
    tone: 'blue' as const,
    visual: <ModelVisual />,
  },
  {
    title: 'Process Automation',
    desc: 'Automating high-volume workflows, docs, and customer interactions.',
    tone: 'white' as const,
    visual: <FlowVisual />,
  },
  {
    title: 'Real-Time Intelligence',
    desc: 'Ultra-low latency AI pipelines delivering decisioning in milliseconds.',
    tone: 'tint' as const,
    visual: <AccuracyRing />,
  },
]

const tones = {
  blue: {
    card: 'panel-blue',
    num: 'text-white/60',
    title: 'text-white',
    desc: 'text-white/80',
    visual: 'bg-white/10 border-white/15',
  },
  white: {
    card: 'bg-white border border-foreground/10',
    num: 'text-primary',
    title: 'text-foreground',
    desc: 'text-muted-foreground',
    visual: 'bg-tint/60 border-primary/10',
  },
  tint: {
    card: 'bg-[#dbe9ff] border border-primary/10',
    num: 'text-primary',
    title: 'text-foreground',
    desc: 'text-muted-foreground',
    visual: 'bg-white border-primary/10',
  },
}

/** Sticky card that shrinks slightly as the cards after it slide up and stack on top. */
function StackCard({
  index,
  total,
  progress,
  pillar,
}: {
  index: number
  total: number
  progress: MotionValue<number>
  pillar: (typeof pillars)[number]
}) {
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - 1 - index) * 0.045])
  const tone = tones[pillar.tone]

  return (
    <div className="sticky" style={{ top: `calc(5.5rem + ${index * 1.5}rem)` }}>
      <motion.article
        style={{ scale, transformOrigin: 'top center' }}
        className={`grid min-h-[430px] items-center gap-8 overflow-hidden rounded-[2rem] p-6 shadow-[0_-18px_50px_-30px_rgba(11,63,196,0.45)] md:grid-cols-2 md:gap-12 md:rounded-[2.5rem] md:p-12 ${tone.card}`}
      >
        <div className="min-w-0">
          <p className={`font-mono text-sm font-bold ${tone.num}`}>
            0{index + 1} <span className="opacity-50">/ 0{total}</span>
          </p>
          <h3 className={`mt-4 font-sans text-[2rem] font-extrabold leading-[1.02] headline-tight sm:text-4xl lg:text-6xl ${tone.title}`}>
            {pillar.title}
          </h3>
          <p className={`mt-5 max-w-sm text-base leading-relaxed md:text-lg ${tone.desc}`}>{pillar.desc}</p>
        </div>
        <div className={`flex min-h-[200px] min-w-0 items-center justify-center rounded-[1.5rem] border p-4 sm:p-6 md:min-h-[300px] md:p-10 ${tone.visual}`}>
          {pillar.visual}
        </div>
      </motion.article>
    </div>
  )
}

export function About() {
  const stackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start 15%', 'end end'] })

  return (
    <section id="about" className="relative px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-end lg:gap-16">
          <div>
            <RisingHeading />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: 0.35, ease }}
            className="max-w-md text-base leading-relaxed text-muted-foreground lg:pb-3"
          >
            VibeAgentic AI is a team of software engineers, AI researchers, and automation specialists. We turn
            complex artificial intelligence into simple, powerful tools that deliver measurable growth.
          </motion.p>
        </div>

        <dl className="mt-10 grid grid-cols-3 divide-x divide-foreground/10 border-y border-foreground/10 md:mt-14">
          {facts.map((fact, i) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className="flex flex-col gap-1 px-3 py-5 first:pl-0 sm:flex-row sm:items-baseline sm:gap-3 sm:px-8 md:py-7"
            >
              <dd className="font-sans text-4xl font-extrabold headline-tight text-foreground md:text-5xl">{fact.value}</dd>
              <dt className="text-xs font-semibold text-muted-foreground md:text-sm">{fact.label}</dt>
            </motion.div>
          ))}
        </dl>

        {/* Cards stack over one another while scrolling */}
        <div ref={stackRef} className="mt-10 flex flex-col gap-6 md:mt-14 md:gap-8">
          {pillars.map((pillar, i) => (
            <StackCard key={pillar.title} index={i} total={pillars.length} progress={scrollYProgress} pillar={pillar} />
          ))}
        </div>
      </div>
    </section>
  )
}
