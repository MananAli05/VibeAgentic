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

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

interface TeamMember {
  name: string
  role: string
  image: string
  objectPosition?: string
}

const teamMembers: TeamMember[] = [
  {
    name: 'Yasir Ali',
    role: 'AI Engineer',
    image: '/yasir.jpg',
    objectPosition: 'object-[center_20%]',
  },
  {
    name: 'Hamayoon Ali',
    role: 'QA Expert',
    image: '/Hamayoon Bhutto.png',
    objectPosition: 'object-top',
  },
  {
    name: 'Abdul Manan',
    role: 'Junior AI Engineer',
    image: '/manan.jpg',
    objectPosition: 'object-[center_15%]',
  },
  {
    name: 'Muhammad Salman',
    role: 'Junior QA Expert',
    image: '/Salman.jpeg',
    objectPosition: 'object-[center_20%]',
  },
]

const founderTags = ['AI Automation', 'Software Architecture', 'Enterprise Solutions']

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

        {/* Founder feature row */}
        <Reveal className="mb-6 grid items-stretch gap-5 lg:grid-cols-2">
          <article data-team-card className="flex flex-col justify-center py-4 lg:pr-10">
            <h3 className="font-sans text-4xl font-extrabold headline-tight text-foreground md:text-5xl">
              Mustafa Shoukat
            </h3>
            <p className="mt-2 text-sm font-bold text-primary">Founder · AI Lead</p>
            <p className="mt-6 max-w-md text-lg font-semibold leading-relaxed text-foreground/85">
              Focused on AI automation, intelligent software architecture, and production-ready enterprise solutions.
            </p>
            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-muted-foreground">
              {founderTags.map((tag, i) => (
                <React.Fragment key={tag}>
                  {i > 0 && <span className="text-foreground/20">/</span>}
                  <span>{tag}</span>
                </React.Fragment>
              ))}
            </p>
            <div className="mt-7 flex items-center gap-2.5">
              <a
                href="https://www.linkedin.com/in/mustafashoukat/"
                target="_blank"
                rel="noopener noreferrer"
                className={socialLinkClass}
              >
                <LinkedinIcon className="size-3.5" />
                LinkedIn
              </a>
              <a
                href="https://github.com/Mustafa-Shoukat1"
                target="_blank"
                rel="noopener noreferrer"
                className={socialLinkClass}
              >
                <GithubIcon className="size-3.5" />
                GitHub
              </a>
            </div>
          </article>

          <div className="group relative h-[380px] overflow-hidden rounded-[2rem] bg-tint md:h-[480px]">
            <img
              src="/mustafa.webp"
              alt="Mustafa Shoukat"
              className="absolute inset-0 h-full w-full object-cover object-[center_20%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-transparent" />
          </div>
        </Reveal>

        {/* Team members */}
        <Reveal
          stagger="[data-team-card]"
          staggerSpeed={0.08}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {teamMembers.map((member) => (
            <article
              key={member.name}
              data-team-card
              className="group card-soft overflow-hidden rounded-[2rem] p-2.5 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_30px_60px_-24px_rgba(22,103,242,0.45)]"
            >
              <div className="relative h-[300px] overflow-hidden rounded-[1.5rem] bg-tint">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full object-cover ${member.objectPosition || 'object-center'} transition-transform duration-700 ease-out group-hover:scale-105`}
                />
              </div>
              <div className="px-4 pb-4 pt-5">
                <h3 className="font-sans text-xl font-extrabold headline-tight text-foreground transition-colors group-hover:text-primary">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs font-bold text-muted-foreground">{member.role}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
