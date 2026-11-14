'use client'

import { Reveal } from '@/components/reveal'
import { Check } from 'lucide-react'

const differences = [
  {
    title: 'Senior Engineers Only',
    desc: 'You work directly with principal builders. No account managers, sales handoffs, or junior coders learning on your budget.',
  },
  {
    title: 'Extreme Transparency',
    desc: 'Daily async updates in shared Slack channels. Continuous production deployments so you test features as they are written.',
  },
  {
    title: 'Flat Monthly Pricing',
    desc: 'No surprise invoices or hourly tracking. One fixed monthly retainer covers all strategy, coding, deployment, and support.',
  },
  {
    title: 'Lightning Fast Timelines',
    desc: 'We ship a working, interactive prototype within 7-10 days of project kickoff. If it does not ship fast, it is not agile.',
  },
]

const technologies = [
  'Python',
  'PyTorch',
  'LangChain',
  'LangGraph',
  'OpenAI',
  'Anthropic Claude',
  'Llama',
  'Next.js',
  'React',
  'FastAPI',
  'PostgreSQL',
  'Supabase',
  'Docker',
  'Kubernetes',
  'Hugging Face',
  'ChromaDB',
  'Pinecone',
  'Vercel',
  'AWS',
  'Google Cloud',
]

export function WhyUs() {
  return (
    <section id="why-us" className="relative section-pad px-5 md:px-8 overflow-hidden">
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute left-[-10%] top-[40%] -z-10 h-[450px] w-[450px] rounded-full blur-3xl opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(73,242,178,0.18) 0%, transparent 70%)',
        }}
      />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8 items-start">
          {/* Left Column: Heading & CTA */}
          <div className="lg:col-span-5 flex flex-col items-start justify-center gap-6">
            <p className="font-mono text-xs text-[#00B4CC] uppercase tracking-wider">{'// Differentiators'}</p>
            <h2 className="font-sans text-4xl font-extrabold headline-tight text-balance md:text-5xl">
              Built different, <span className="gradient-brand-text">on purpose.</span>
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              We cut through agency bloat. We do not do endless planning decks or waste time in alignment meetings. We write clean code, integrate advanced AI, and ship stable platforms.
            </p>
            <a
              href="#contact"
              className="mt-4 group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-foreground px-7 py-3.5 text-sm font-bold text-background transition-all duration-300 hover:bg-foreground/90 hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.08)]"
            >
              Start a Project
            </a>
          </div>

          {/* Right Column: Differentiators List */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {differences.map((diff) => (
              <div
                key={diff.title}
                className="flex gap-4 p-6 rounded-xl border border-border/40 bg-surface/10 glass-panel transition-all duration-300 hover:border-[#00B4CC]/30 hover:bg-surface/20"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#00B4CC]/15 text-[#00B4CC]">
                  <Check className="size-4" />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-sans text-lg font-bold text-foreground">
                    {diff.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {diff.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Cloud */}
        <div className="mt-28 flex flex-col items-center gap-8">
          <div className="text-center max-w-2xl">
            <p className="font-mono text-xs text-[#49F2B2] uppercase tracking-widest">{'// Core Stack'}</p>
            <h3 className="font-sans text-2xl font-bold text-foreground mt-2">
              Everything you need to run on intelligence
            </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs font-semibold px-4 py-2 rounded-full border border-border/40 bg-surface/20 text-muted-foreground cursor-default transition-all duration-300 hover:text-foreground hover:border-[#00B4CC]/50 hover:bg-surface/40 hover:scale-105 hover:shadow-[0_0_15px_rgba(0,180,204,0.15)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
