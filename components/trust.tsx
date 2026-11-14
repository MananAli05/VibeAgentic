'use client'

import * as React from 'react'
import { Check, Minus, X, Quote, ExternalLink, ShieldCheck, Handshake, FlaskConical, Receipt, KeyRound, Users } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { ArrowButton } from '@/components/ui/arrow-button'
import { useModals } from '@/lib/modal-context'
import {
  clientStories,
  comparisonColumns,
  comparisonColumnsShort,
  comparisonRows,
  engagementOptions,
  nextSteps,
  values,
  type Mark,
} from '@/components/trust-data'

/** "Where to start": smaller, cheaper ways in before committing to a full build. */
export function WhereToStart() {
  const { openStrategyCall, openStartProject } = useModals()

  return (
    <section id="start" className="relative section-pad px-5 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-10 grid gap-6 md:mb-14 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <h2 className="font-sans text-4xl font-extrabold leading-[1.02] headline-tight text-balance md:text-6xl">
            Start small. <span className="text-[#5f80b8]">Scale when it pays off.</span>
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            AI does not have to start with a big budget. Pick the step that fits where you are today. If a ready-made
            tool already solves your problem, we will tell you before you spend anything with us.
          </p>
        </Reveal>

        <Reveal stagger="[data-option]" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {engagementOptions.map((option) => (
            <article
              key={option.name}
              data-option
              className={`card-soft relative flex flex-col rounded-[1.75rem] p-6 ${
                option.tag ? 'ring-2 ring-primary/40' : ''
              }`}
            >
              {option.tag && (
                <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_8px_20px_-8px_rgba(22,103,242,0.8)]">
                  {option.tag}
                </span>
              )}
              <CommitmentMeter level={option.commitment} />
              <h3 className="mt-5 font-sans text-2xl font-extrabold headline-tight text-foreground">{option.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{option.desc}</p>

              <dl className="mt-5 space-y-3 border-t border-foreground/[0.07] pt-4 text-sm">
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">Best for</dt>
                  <dd className="mt-0.5 font-semibold text-foreground">{option.bestFor}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">You get</dt>
                  <dd className="mt-0.5 font-semibold text-foreground">{option.youGet}</dd>
                </div>
              </dl>

              <div className="mt-auto pt-6">
                <ArrowButton
                  size="sm"
                  variant={option.tag ? 'primary' : 'outline'}
                  onClick={() => (option.cta === 'call' ? openStrategyCall() : openStartProject())}
                >
                  {option.cta === 'call' ? 'Book a call' : 'Discuss a project'}
                </ArrowButton>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function CommitmentMeter({ level }: { level: number }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-bold text-muted-foreground">
      <span className="flex gap-1" aria-hidden="true">
        {[1, 2, 3, 4].map((n) => (
          <span key={n} className={`h-1.5 w-4 rounded-full ${n <= level ? 'bg-primary' : 'bg-foreground/10'}`} />
        ))}
      </span>
      <span className="sr-only">Commitment level {level} of 4:</span>
      {['Lightest', 'Light', 'Medium', 'Largest'][level - 1]} commitment
    </span>
  )
}

const valueIcons = [Handshake, Users, FlaskConical, Receipt, KeyRound, ShieldCheck]

/** "Why TryAzog": our values, plus an honest comparison with the alternatives a buyer is weighing. */
export function WhyTryAzog() {
  return (
    <section id="why-us" className="relative px-3 py-6 md:px-5 md:py-10">
      <div className="panel-blue mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] px-5 py-14 md:rounded-[2.75rem] md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 max-w-3xl md:mb-14">
            <h2 className="font-sans text-4xl font-extrabold leading-[1.02] headline-tight text-balance md:text-6xl">
              Why teams choose <span className="text-[#a9dcff]">TryAzog.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
              Plenty of companies can build AI. This is how we work, and what you can hold us to.
            </p>
          </Reveal>

          <Reveal stagger="[data-value]" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, i) => {
              const Icon = valueIcons[i % valueIcons.length]
              return (
                <div key={value.title} data-value className="rounded-[1.5rem] border border-white/15 bg-white/10 p-6">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-white text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-sans text-lg font-extrabold headline-tight">{value.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/80">{value.desc}</p>
                </div>
              )
            })}
          </Reveal>

          <Reveal className="mt-12 md:mt-16">
            <h3 className="font-sans text-2xl font-extrabold headline-tight md:text-3xl">How we compare</h3>
            <p className="mt-2 text-sm text-white/75">
              The options most teams weigh before they decide.
            </p>

            {/* Phones: one card per question */}
            <ul className="mt-6 grid gap-3 sm:hidden">
              {comparisonRows.map((row) => (
                <li key={row.label} className="rounded-[1.25rem] bg-white p-4 text-foreground">
                  <p className="font-sans text-sm font-extrabold">{row.label}</p>
                  <dl className="mt-3 grid grid-cols-2 gap-2">
                    {comparisonColumnsShort.map((col, i) => (
                      <div
                        key={col}
                        className={`flex items-center gap-2 rounded-xl px-2.5 py-2 ${i === 0 ? 'bg-primary/[0.08]' : 'bg-foreground/[0.03]'}`}
                      >
                        <MarkIcon mark={row.cells[i]} />
                        <div className="min-w-0">
                          <dt className={`truncate text-[11px] font-bold ${i === 0 ? 'text-primary' : 'text-foreground'}`}>{col}</dt>
                          <dd className="text-[10px] font-semibold text-muted-foreground">
                            {row.notes?.[i] ?? { yes: 'Yes', no: 'No', partial: 'Partly' }[row.cells[i]]}
                          </dd>
                        </div>
                      </div>
                    ))}
                  </dl>
                </li>
              ))}
            </ul>
            <div className="mt-6 hidden overflow-x-auto rounded-[1.5rem] bg-white text-foreground sm:block">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-foreground/[0.07]">
                    <th scope="col" className="p-4 text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground md:p-5">
                      <span className="sr-only">Criteria</span>
                    </th>
                    {comparisonColumns.map((col, i) => (
                      <th
                        key={col}
                        scope="col"
                        className={`p-4 text-center font-sans text-sm font-extrabold md:p-5 ${
                          i === 0 ? 'bg-primary/[0.06] text-primary' : 'text-foreground'
                        }`}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.label} className="border-b border-foreground/[0.06] last:border-0">
                      <th scope="row" className="p-4 font-semibold text-foreground md:p-5">
                        {row.label}
                      </th>
                      {row.cells.map((mark, i) => (
                        <td key={i} className={`p-4 text-center md:p-5 ${i === 0 ? 'bg-primary/[0.06]' : ''}`}>
                          <MarkCell mark={mark} note={row.notes?.[i]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function MarkCell({ mark, note }: { mark: Mark; note?: string }) {
  const label = { yes: 'Yes', no: 'No', partial: 'Partly' }[mark]
  return (
    <span className="inline-flex flex-col items-center gap-1">
      <MarkIcon mark={mark} />
      <span className={note ? 'text-[11px] font-semibold text-muted-foreground' : 'sr-only'}>{note ?? label}</span>
    </span>
  )
}

function MarkIcon({ mark }: { mark: Mark }) {
  return (
    <>
      {mark === 'yes' && (
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-white">
          <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
        </span>
      )}
      {mark === 'partial' && (
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
          <Minus className="size-3.5" strokeWidth={3} aria-hidden="true" />
        </span>
      )}
      {mark === 'no' && (
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-foreground/[0.06] text-foreground/40">
          <X className="size-3.5" strokeWidth={3} aria-hidden="true" />
        </span>
      )}
    </>
  )
}

/**
 * Client stories told around the client's decision: the situation, the options they weighed,
 * why they chose us, and the result. Hidden until real stories are added in trust-data.ts.
 */
export function ClientStories() {
  if (clientStories.length === 0) return null

  return (
    <section id="stories" className="relative section-pad px-5 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-10 max-w-3xl md:mb-14">
          <h2 className="font-sans text-4xl font-extrabold leading-[1.02] headline-tight text-balance md:text-6xl">
            How our clients <span className="text-[#5f80b8]">decided.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Real projects: the problem, the options they weighed, why they chose us, and what changed.
          </p>
        </Reveal>

        <div className="grid gap-6">
          {clientStories.map((story) => (
            <Reveal key={story.client}>
              <article className="card-soft grid gap-8 rounded-[2rem] p-6 md:p-10 lg:grid-cols-[1.2fr_1fr]">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">{story.industry}</p>
                  <h3 className="mt-2 font-sans text-3xl font-extrabold headline-tight text-foreground">{story.client}</h3>

                  <StoryBlock title="The situation">{story.situation}</StoryBlock>
                  <StoryBlock title="Options they considered">
                    <ul className="mt-1 flex flex-wrap gap-2">
                      {story.optionsConsidered.map((o) => (
                        <li key={o} className="rounded-full border border-foreground/10 bg-white px-3 py-1 text-xs font-semibold">
                          {o}
                        </li>
                      ))}
                    </ul>
                  </StoryBlock>
                  <StoryBlock title="Why they chose TryAzog">{story.whyChose}</StoryBlock>
                  <StoryBlock title="What we built">{story.built}</StoryBlock>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    {story.results.map((r) => (
                      <div key={r.label} className="rounded-2xl bg-primary/[0.06] p-4">
                        <p className="font-sans text-3xl font-extrabold headline-tight text-primary">{r.value}</p>
                        <p className="mt-1 text-xs font-semibold text-muted-foreground">{r.label}</p>
                      </div>
                    ))}
                  </div>
                  {story.quote && (
                    <figure className="rounded-2xl border border-foreground/[0.07] bg-white p-5">
                      <Quote className="size-5 text-primary/40" aria-hidden="true" />
                      <blockquote className="mt-2 text-sm font-semibold leading-relaxed text-foreground">
                        “{story.quote.text}”
                      </blockquote>
                      <figcaption className="mt-3 text-xs text-muted-foreground">
                        <span className="font-bold text-foreground">{story.quote.name}</span> · {story.quote.role}
                      </figcaption>
                    </figure>
                  )}
                  {story.proofUrl && (
                    <a
                      href={story.proofUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-fit items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                    >
                      Verify this story <ExternalLink className="size-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function StoryBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">{title}</p>
      <div className="mt-1 text-sm leading-relaxed text-foreground/80">{children}</div>
    </div>
  )
}

/** "What happens after you reach out": removes the uncertainty before someone contacts us. */
export function NextSteps() {
  return (
    <section id="next-steps" className="relative px-5 pt-16 md:px-8 md:pt-24">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-8 max-w-3xl md:mb-12">
          <h2 className="font-sans text-3xl font-extrabold leading-[1.05] headline-tight text-balance md:text-5xl">
            What happens <span className="gradient-brand-text">after you reach out</span>
          </h2>
        </Reveal>
        <Reveal stagger="[data-step]">
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {nextSteps.map((step, i) => (
              <li key={step.title} data-step className="card-soft relative rounded-[1.5rem] p-5">
                <span className="font-mono text-xs font-bold text-primary">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 font-sans text-lg font-extrabold leading-tight headline-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
