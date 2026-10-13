'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Pause, Play, Quote, Star } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import * as React from 'react'

const reviews = [
  {
    name: 'Ayesha Khan',
    title: 'CTO • HealthTech Inc',
    logo: '/health-review.jpg',
    company: 'HealthTech Inc',
    quote: 'VibeAgentic automated our patient support workflow and reduced manual work by over 60%. The team delivered exactly what they promised with zero downtime.',
  },
  {
    name: 'Michael Chen',
    title: 'Operations Director • ManufacturePro',
    logo: '/maunfacture-review.jpg',
    company: 'ManufacturePro',
    quote: 'We replaced repetitive internal processes with AI automation. Deployment was smooth and the productivity gains across our team were immediate.',
  },
  {
    name: 'Sarah Johnson',
    title: 'Founder • RetailFlow',
    logo: '/retail-review.jpg',
    company: 'RetailFlow',
    quote: 'The AI chatbot and automation system significantly improved our customer response time while drastically cutting operational costs.',
  },
]

const ROTATE_MS = 6000

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % reviews.length), ROTATE_MS)
    return () => window.clearTimeout(id)
  }, [index, paused])

  const review = reviews[index]

  return (
    <section id="testimonials" className="relative px-3 py-6 md:px-5 md:py-10">
      <div className="panel-blue mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] px-5 py-14 md:rounded-[2.75rem] md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 max-w-3xl md:mb-14">
            <h2 className="font-sans text-4xl font-extrabold leading-[1.02] headline-tight text-balance md:text-6xl">
              Trusted by teams <span className="text-[#a9dcff]">building with AI.</span>
            </h2>
          </Reveal>

          <Reveal stagger="[data-card]" className="grid gap-4 lg:grid-cols-[1fr_2fr]">
            <div
              data-card
              className="flex min-h-[220px] flex-col justify-between rounded-[2rem] border border-white/15 bg-white/10 p-7 md:p-9 lg:min-h-[380px]"
            >
              <Quote className="size-10 rotate-180 fill-white/25 text-transparent" aria-hidden="true" />
              <div>
                <h3 className="font-sans text-3xl font-extrabold leading-[1.05] headline-tight">
                  The work,
                  <br />
                  in their words.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  Companies rely on VibeAgentic to automate workflows, build custom AI systems, and scale business
                  operations.
                </p>
              </div>
            </div>

            <div
              data-card
              className="flex min-h-[380px] flex-col rounded-[2rem] bg-white p-7 text-foreground shadow-[0_30px_70px_-30px_rgba(4,24,84,0.6)] md:p-9"
              aria-roledescription="carousel"
              aria-label="Client testimonials"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center" role="tablist" aria-label="Choose testimonial">
                  {reviews.map((r, i) => (
                    <button
                      key={r.name}
                      type="button"
                      role="tab"
                      aria-selected={i === index}
                      aria-label={`Testimonial ${i + 1}: ${r.name}`}
                      onClick={() => setIndex(i)}
                      className="group flex h-8 min-w-6 items-center justify-center cursor-pointer"
                    >
                      <span
                        className={`block h-1.5 rounded-full transition-all duration-500 ${
                          i === index ? 'w-7 bg-primary' : 'w-1.5 bg-foreground/20 group-hover:bg-foreground/40'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setPaused((p) => !p)}
                  aria-label={paused ? 'Resume auto-rotation' : 'Pause auto-rotation'}
                  className="flex size-9 items-center justify-center rounded-xl bg-tint text-primary transition-colors hover:bg-primary hover:text-white cursor-pointer"
                >
                  {paused ? <Play className="size-3.5 fill-current" /> : <Pause className="size-3.5 fill-current" />}
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={review.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-1 flex-col"
                  aria-live="polite"
                >
                  <div className="mt-7 flex gap-1" aria-label="5 star rating">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="size-4 fill-[#F59E0B] stroke-[#F59E0B]" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="mt-4 font-sans text-xl font-bold leading-snug headline-tight text-foreground md:text-[1.7rem]">
                    “{review.quote}”
                  </blockquote>

                  <div className="mt-auto flex items-center justify-between gap-4 pt-8">
                    <div className="flex items-center gap-3">
                      <img
                        src={review.logo}
                        alt={review.company}
                        className="size-11 rounded-xl border border-foreground/10 object-cover"
                      />
                      <div>
                        <p className="text-sm font-extrabold text-foreground">{review.name}</p>
                        <p className="text-xs font-medium text-muted-foreground">{review.title}</p>
                      </div>
                    </div>
                    <span className="shrink-0 whitespace-nowrap font-mono text-xs font-bold text-muted-foreground">
                      0{index + 1} / 0{reviews.length}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
