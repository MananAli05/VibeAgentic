'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const faqs = [
  {
    q: 'What kind of projects do you take on?',
    a: 'Generative AI integrations, RAG applications, process automation, custom chatbots, AI copilots, LLM fine-tuning, autonomous agents and enterprise API integrations. If it helps your business work faster and smarter, we are interested.',
  },
  {
    q: 'Which industries do you work with?',
    a: 'We build for healthcare, finance, education, real estate, e-commerce and manufacturing — shaping each system around the workflows and compliance needs of that sector.',
  },
  {
    q: 'How does a project usually start?',
    a: 'With discovery: a deep audit of your current workflows, business data and AI opportunities. From there we move through design, development and deployment.',
  },
  {
    q: 'Which technologies do you build with?',
    a: 'Trusted, modern AI infrastructure — including OpenAI, Anthropic Claude, Meta models, LangGraph, Pinecone, Supabase, FastAPI and n8n — chosen to fit your use case.',
  },
  {
    q: 'Can you work with our existing software and data?',
    a: 'Yes. We connect AI systems to your CRM, ERP, databases, documents and internal tools through secure API and webhook integrations.',
  },
  {
    q: 'Do you offer support after launch?',
    a: 'Yes. Deployment includes telemetry monitoring, staff training and continuous tuning so the system keeps improving after it goes live.',
  },
  {
    q: 'How do we get started?',
    a: 'Start a project or book a strategy call from this page. Tell us what you want to automate or build and we will recommend the right AI solution for your business.',
  },
]

export function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="relative section-pad px-5 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-sans text-5xl font-extrabold leading-[0.98] headline-tight md:text-7xl">
            Questions,
            <br />
            <span className="text-[#9bb4dc]">answered.</span>
          </h2>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Everything you might want to know before starting a project with VibeAgentic.
          </p>
        </Reveal>

        <Reveal stagger="[data-faq]" staggerSpeed={0.06} className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = i === open
            return (
              <div
                key={faq.q}
                data-faq
                className={`card-soft rounded-3xl transition-colors duration-300 ${isOpen ? 'border-primary/25' : ''}`}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-button-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left cursor-pointer"
                  >
                    <span className="font-sans text-base font-extrabold headline-tight text-foreground md:text-lg">
                      {faq.q}
                    </span>
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                        isOpen ? 'rotate-45 bg-primary text-white' : 'bg-tint text-primary'
                      }`}
                    >
                      <Plus className="size-4" strokeWidth={2.6} aria-hidden="true" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-xl px-6 pb-6 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
