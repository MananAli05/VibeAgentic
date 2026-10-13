'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'Deep audit of your current workflows, business data, and AI opportunities.',
  },
  {
    num: '02',
    title: 'Design',
    desc: 'Architectural blueprint, security model, and interface specification.',
  },
  {
    num: '03',
    title: 'Develop',
    desc: 'Model integration, RAG pipeline construction, and custom software engineering.',
  },
  {
    num: '04',
    title: 'Deploy',
    desc: 'Enterprise deployment, telemetry monitoring, staff training, and continuous tuning.',
  },
]

const ease = [0.22, 1, 0.36, 1] as const

export function Process() {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length))))
  })

  const step = steps[active]

  return (
    // Tall section: the inner panel stays pinned while scrolling advances the steps
    <section ref={ref} id="process" className="relative" style={{ height: `${steps.length * 70 + 60}vh` }}>
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden px-5 py-20 md:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-10 md:mb-14">
            <h2 className="max-w-3xl font-sans text-3xl font-extrabold leading-[1.05] headline-tight text-balance md:text-5xl">
              A focused path from messy operations to <span className="gradient-brand-text">production AI</span>
            </h2>
          </div>

          <div className="grid grid-cols-[auto_1fr] items-center gap-6 md:grid-cols-[auto_1fr_auto] md:gap-12">
            {/* Timeline rail */}
            <ol className="relative flex flex-col gap-9 md:gap-11" aria-label="Process steps">
              <span className="absolute left-[5px] top-1 h-[calc(100%-8px)] w-px bg-foreground/10" aria-hidden="true" />
              <motion.span
                aria-hidden="true"
                className="absolute left-[5px] top-1 w-px origin-top bg-primary"
                style={{ height: 'calc(100% - 8px)', scaleY: scrollYProgress }}
              />
              {steps.map((s, i) => (
                <li key={s.num} className="relative flex items-center" aria-current={i === active ? 'step' : undefined}>
                  <span
                    className={`size-[11px] rounded-full border-2 transition-all duration-500 ${
                      i <= active ? 'border-primary bg-primary' : 'border-foreground/20 bg-background'
                    } ${i === active ? 'scale-150 shadow-[0_0_0_5px_rgba(22,103,242,0.15)]' : ''}`}
                  />
                  <span className="sr-only">{s.title}</span>
                </li>
              ))}
            </ol>

            {/* Step copy */}
            <div className="min-h-[190px] md:min-h-[210px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <p className="font-mono text-sm font-bold text-primary md:hidden">{step.num}</p>
                  <h3 className="font-sans text-5xl font-extrabold headline-tight text-foreground md:text-7xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                    {step.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Giant numeral */}
            <div className="hidden select-none overflow-hidden md:block" aria-hidden="true">
              <div className="flex font-sans text-[15rem] font-extrabold leading-[0.85] tracking-[-0.06em] lg:text-[20rem]">
                <span className="text-[#d3e2f8]">0</span>
                <span className="relative inline-block min-w-[0.62em]">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={step.num}
                      initial={{ y: '60%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      exit={{ y: '-60%', opacity: 0 }}
                      transition={{ duration: 0.55, ease }}
                      className="gradient-brand-text inline-block"
                    >
                      {step.num[1]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
