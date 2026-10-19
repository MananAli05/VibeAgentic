import { Reveal } from '@/components/reveal'
import * as React from 'react'

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const founderTags = ['AI Automation', 'Software Architecture', 'Enterprise Solutions']
const mauriceTags = ['Real Estate Investment', 'Business Funding', 'Credit & Financial Solutions']

const socialLinkClass =
  'inline-flex items-center gap-2 rounded-xl border border-foreground/10 bg-white px-4 py-2 text-xs font-bold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary'

export function Team() {
  return (
    <section id="team" className="relative section-pad overflow-hidden px-5 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-12 max-w-4xl md:mb-16">
          <h2 className="font-sans text-4xl font-extrabold leading-[1.02] headline-tight text-balance md:text-7xl">
            The people behind <span className="text-[#9bb4dc]">the systems.</span>
          </h2>
          <p className="mt-4 text-sm text-muted-foreground md:text-base">
            Experienced minds. Structured solutions. Sustainable results.
          </p>
        </Reveal>

        <Reveal
          className="grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          <article data-team-card className="order-2 card-soft overflow-hidden rounded-[2rem] p-3 lg:order-2">
            <div className="group relative h-[340px] overflow-hidden rounded-[1.5rem] bg-tint md:h-[400px]">
              <img
                src="/mustafa-shoukat.png"
                alt="Mustafa Shoukat"
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
            </div>
            <div className="px-4 pb-5 pt-6">
              <h3 className="font-sans text-3xl font-extrabold headline-tight text-foreground">Mustafa Shoukat</h3>
              <p className="mt-2 text-sm font-bold text-primary">Co-founder · AI Lead</p>
              <p className="mt-4 text-sm font-semibold leading-relaxed text-foreground/75">
                Focused on AI automation, intelligent software architecture, and production-ready enterprise solutions.
              </p>
              <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-muted-foreground">
                {founderTags.map((tag, i) => (
                  <React.Fragment key={tag}>
                    {i > 0 && <span className="text-foreground/20">/</span>}
                    <span>{tag}</span>
                  </React.Fragment>
                ))}
              </p>
              <div className="mt-6 flex items-center gap-2.5">
                <a href="https://www.linkedin.com/in/mustafashoukat/" target="_blank" rel="noopener noreferrer" className={socialLinkClass}>
                  <LinkedinIcon className="size-3.5" />
                  LinkedIn
                </a>
              </div>
            </div>
          </article>

          <article data-team-card className="order-1 card-soft overflow-hidden rounded-[2rem] p-3 lg:order-1">
            <div className="group relative h-[340px] overflow-hidden rounded-[1.5rem] bg-tint md:h-[400px]">
              <img
                src="/maurice-cornelius.png"
                alt="Maurice Cornelius"
                className="absolute inset-0 h-full w-full object-cover object-[center_20%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
            </div>
            <div className="px-4 pb-5 pt-6">
              <h3 className="font-sans text-3xl font-extrabold headline-tight text-foreground">Maurice Cornelius</h3>
              <p className="mt-2 text-sm font-bold text-primary">Founder · Leadership</p>
              <p className="mt-4 text-sm font-semibold leading-relaxed text-foreground/75">
                Bringing experience in real estate investment, business funding, and credit-focused financial solutions.
              </p>
              <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-muted-foreground">
                {mauriceTags.map((tag, i) => (
                  <React.Fragment key={tag}>
                    {i > 0 && <span className="text-foreground/20">/</span>}
                    <span>{tag}</span>
                  </React.Fragment>
                ))}
              </p>
              <div className="mt-6 flex items-center gap-2.5">
                <a
                  href="https://www.linkedin.com/in/maurice-cornelius/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialLinkClass}
                >
                  <LinkedinIcon className="size-3.5" />
                  LinkedIn
                </a>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
