'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, MotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowButton } from '@/components/ui/arrow-button'
import { useModals, IndustryDetail } from '@/lib/modal-context'
import { industries } from '@/components/industries-data'

// Angle between neighbouring cards on the helix
const STEP_ANGLE = 48

interface HelixSize {
  width: number
  height: number
  radius: number
  rise: number
}

const helixDesktop: HelixSize = { width: 500, height: 340, radius: 600, rise: 96 }

/** Card and spiral dimensions that fit the current viewport. */
function helixFor(vw: number, vh: number): HelixSize {
  if (vw < 640) {
    return { width: Math.min(280, vw - 64), height: Math.round(Math.min(370, vh * 0.48)), radius: 330, rise: 64 }
  }
  if (vw < 1024) return { width: 420, height: 300, radius: 470, rise: 80 }
  return helixDesktop
}

/** One step of the spiral staircase: its angle and height follow how far it is from the front. */
function HelixCard({
  industry,
  index,
  total,
  progress,
  size,
  onOpen,
}: {
  industry: IndustryDetail
  index: number
  total: number
  progress: MotionValue<number>
  size: HelixSize
  onOpen: () => void
}) {
  // 0 = front and centre; negative = already passed (up and to the left); positive = still to come
  const offset = useTransform(progress, (v) => index - v * (total - 1))
  const transform = useTransform(
    offset,
    (d) =>
      `translate(-50%, -50%) translateZ(${-size.radius}px) rotateY(${d * STEP_ANGLE}deg) translateZ(${size.radius}px) translateY(${d * size.rise}px)`
  )
  const opacity = useTransform(offset, (d) => Math.max(0, Math.min(1, 1.3 - Math.abs(d) * 0.5)))
  const filter = useTransform(offset, (d) => `blur(${Math.min(4, Math.max(0, Math.abs(d) - 0.6) * 2.5)}px)`)
  const zIndex = useTransform(offset, (d) => 100 - Math.round(Math.abs(d) * 10))
  const pointerEvents = useTransform(offset, (d) => (Math.abs(d) < 0.5 ? 'auto' : 'none'))
  const detailOpacity = useTransform(offset, (d) => Math.max(0, 1 - Math.abs(d) * 2.2))

  return (
    <motion.article
      style={{ transform, opacity, filter, zIndex, pointerEvents, width: size.width, height: size.height }}
      className="absolute left-1/2 top-1/2 overflow-hidden rounded-[1.75rem] border border-white/25 bg-[#0b3fc4] shadow-[0_40px_80px_-30px_rgba(4,20,80,0.75)] [backface-visibility:hidden]"
    >
      <img src={industry.image} alt={industry.alt} decoding="async" fetchPriority="low" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a3ab8] via-[#0d4fd8]/55 to-[#1667f2]/10" />

      <div className="relative flex h-full flex-col justify-between p-5 text-white sm:p-7">
        <span className="w-fit rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] font-bold text-primary">
          {`// 0${index + 1}`}
        </span>
        <div>
          <h3 className="font-sans text-3xl font-extrabold headline-tight drop-shadow-sm sm:text-4xl">{industry.title}</h3>
          <motion.div style={{ opacity: detailOpacity }}>
            <p className="mt-2 max-w-sm text-sm font-medium leading-relaxed text-white/90">{industry.desc}</p>
            <ArrowButton variant="light" size="sm" className="mt-4" onClick={onOpen}>
              Learn More
            </ArrowButton>
          </motion.div>
        </div>
      </div>
    </motion.article>
  )
}

export function Industries() {
  const { openIndustryDetail } = useModals()
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const [size, setSize] = useState<HelixSize>(helixDesktop)
  const total = industries.length

  useEffect(() => {
    const update = () => setSize(helixFor(window.innerWidth, window.innerHeight))
    update()
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  // Hold the first and last cards at the front for a moment at each end of the pinned scroll
  const eased = useTransform(scrollYProgress, [0.06, 0.94], [0, 1], { clamp: true })
  const progress = useSpring(eased, { stiffness: 80, damping: 22, mass: 0.6 })

  useMotionValueEvent(progress, 'change', (v) => {
    setActive(Math.min(total - 1, Math.max(0, Math.round(v * (total - 1)))))
  })

  return (
    // Tall section: the panel stays pinned while scrolling winds the cards around the spiral
    <section ref={ref} id="industries" className="relative" style={{ height: `${total * 70 + 60}vh` }}>
      <div className="sticky top-0 h-svh p-3 md:p-5">
        <div className="panel-blue relative h-full overflow-hidden rounded-[2rem] md:rounded-[2.75rem]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_58%,rgba(124,200,255,0.35),transparent)]" />

          <header className="pointer-events-none relative z-[200] px-6 pt-20 md:px-12 md:pt-24">
            <h2 className="max-w-2xl font-sans text-[1.65rem] font-extrabold leading-[1.02] headline-tight text-balance md:text-5xl">
              Built for the way your industry <span className="text-[#a9dcff]">actually works.</span>
            </h2>
          </header>

          {/* 3D stage */}
          <div className="absolute inset-0 top-[18%] sm:top-[10%] [perspective:1500px]">
            <div className="absolute inset-0 [transform-style:preserve-3d]">
              {industries.map((industry, i) => (
                <HelixCard
                  key={industry.title}
                  industry={industry}
                  index={i}
                  total={total}
                  progress={progress}
                  size={size}
                  onOpen={() => openIndustryDetail(industry)}
                />
              ))}
            </div>
          </div>

          <footer className="absolute inset-x-0 bottom-0 z-[200] flex items-center justify-between gap-4 px-6 pb-6 md:px-12 md:pb-8">
            <span className="hidden font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 sm:block">
              Scroll to explore
            </span>
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {industries.map((industry, i) => (
                <span
                  key={industry.title}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === active ? 'w-8 bg-white' : 'w-1.5 bg-white/35'
                  }`}
                />
              ))}
            </div>
            <span className="font-mono text-xs font-bold text-white/80" aria-live="polite">
              0{active + 1} / 0{total} <span className="hidden text-white/55 sm:inline">· {industries[active].title}</span>
            </span>
          </footer>
        </div>
      </div>
    </section>
  )
}
