'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { ArrowButton } from '@/components/ui/arrow-button'
import { useModals, ServiceDetail } from '@/lib/modal-context'

interface ServiceItem extends ServiceDetail {
  visual: string
}

const services: ServiceItem[] = [
  {
    visual: 'generative',
    num: '01',
    title: 'Generative AI Integration',
    hook: 'Bespoke models, not generic prompts.',
    desc: 'Custom-tailored generative pipelines for content generation, image generation, data parsing, and business operations.',
    overview: 'We build custom-tailored generative pipelines for structured content generation, multimodal document parsing, automated report creation, and synthetic data generation, seamlessly integrated into your software ecosystem.',
    features: [
      'Multimodal LLM integration (GPT-4o, Claude 3.5, Gemini)',
      'Structured JSON output validation & schema enforcement',
      'Enterprise safety guardrails & PII redaction',
      'Automated batch parsing & content generation pipelines',
    ],
    techStack: ['OpenAI API', 'Anthropic Claude', 'FastAPI', 'Instructor', 'LangChain'],
    deliverables: ['Custom API Microservices', 'Automated Content Pipeline', 'Admin Control Dashboard'],
  },
  {
    visual: 'rag',
    num: '02',
    title: 'RAG Applications',
    hook: 'Your private databases, talking back.',
    desc: 'Secure vector search systems connecting large language models to your company databases, wiki docs, and internal knowledge bases.',
    overview: 'Transform static internal databases, PDFs, Notion spaces, and SQL records into conversational intelligence. Our Retrieval-Augmented Generation (RAG) systems deliver hyper-accurate answers backed by exact source citations.',
    features: [
      'Hybrid semantic vector + keyword search retrieval',
      'Multi-format document connectors (PDF, DOCX, Notion, SQL)',
      'Role-based data access control & encryption',
      'Hallucination reduction & citation verification',
    ],
    techStack: ['Pinecone', 'Qdrant', 'LlamaIndex', 'Supabase Vector', 'Python'],
    deliverables: ['Knowledge Search Engine', 'Internal QA Assistant', 'Auto-updating Vector Pipeline'],
  },
  {
    visual: 'automation',
    num: '03',
    title: 'AI Process Automation',
    hook: 'Retire manual, repetitive tasks.',
    desc: 'Automating high-volume business workflows, document processing pipelines, automated email routing, and data cleaning loops.',
    overview: 'End-to-end automation of high-volume repetitive tasks. We replace manual data entry, email processing, and invoice verification with autonomous intelligent bots.',
    features: [
      'Intelligent OCR & document processing',
      'Automated email categorization & routing',
      'Multi-app workflow orchestration (CRM, ERP, Slack)',
      'Human-in-the-loop exception handling',
    ],
    techStack: ['n8n', 'Make', 'Python', 'FastAPI', 'Celery'],
    deliverables: ['Workflow Integration Suite', 'Document Extraction Bot', 'Email Triage Automation'],
  },
  {
    visual: 'chatbot',
    num: '04',
    title: 'Custom AI Chatbots',
    hook: 'Customer service, trained on your data.',
    desc: 'Dynamic customer support bots and sales assistants that live on your website and support channels, keeping your voice consistent.',
    overview: '24/7 intelligent customer service agents trained exclusively on your products, FAQ knowledge bases, and inventory systems to resolve support queries and qualify inbound leads.',
    features: [
      'Omnichannel support (Web, WhatsApp, Slack, Email)',
      'Real-time CRM lead qualification & booking',
      'Custom brand tone & guardrail alignment',
      'Seamless human support rep handoff',
    ],
    techStack: ['LangGraph', 'Next.js', 'Voiceflow', 'Supabase', 'Webhooks'],
    deliverables: ['Embeddable Web Chat Widget', 'WhatsApp/Slack AI Agent', 'Analytics & Conversation Dashboard'],
  },
  {
    visual: 'copilot',
    num: '05',
    title: 'AI Copilots & Assistants',
    hook: 'Amplify employee performance.',
    desc: 'Intelligent interface companions that assist your operational team in real-time, built directly into your legacy software workflows.',
    overview: 'Empower your employees with embedded AI assistants that suggest next steps, write context-aware draft responses, summarize long threads, and trigger backend actions inside your team tools.',
    features: [
      'Contextual inline suggestions & auto-completion',
      'Browser extension & desktop widget capabilities',
      'Real-time meeting & document summarization',
      'Custom action triggers for internal tools',
    ],
    techStack: ['React', 'Chrome Extension API', 'Anthropic Claude', 'OpenAI'],
    deliverables: ['Custom Chrome Extension', 'Inline Copilot Widget', 'Productivity Analytics'],
  },
  {
    visual: 'training',
    num: '06',
    title: 'LLM Tuning & Training',
    hook: 'Domain-specific model intelligence.',
    desc: 'Fine-tuning open-weight models (Llama, Mistral, Qwen) on your proprietary datasets to achieve deep domain specialization.',
    overview: 'Achieve maximum data privacy, ultra-low latency, and lower token costs by fine-tuning open-weight models on your domain-specific codebases, legal documents, or medical records.',
    features: [
      'LoRA & QLoRA parameter-efficient fine-tuning',
      'Dataset curation & synthetic data generation',
      'Self-hosted, private cloud LLM deployment',
      'Custom model benchmark & latency optimization',
    ],
    techStack: ['PyTorch', 'Hugging Face', 'Llama 3', 'vLLM', 'RunPod'],
    deliverables: ['Quantized Private Weights', 'Inference API Service', 'Model Evaluation Benchmark Report'],
  },
  {
    visual: 'agents',
    num: '07',
    title: 'Autonomous AI Agents',
    hook: 'Multi-agent coordination loops.',
    desc: 'Intelligent systems capable of reasoning, tool usage, APIs interaction, and long-term planning with LangGraph frameworks.',
    overview: 'Engineered multi-agent systems that solve complex, multi-step tasks. Our agents break down objectives, browse the web, execute code, query databases, and verify their own results.',
    features: [
      'Multi-agent graph architectures (LangGraph / CrewAI)',
      'Autonomous tool use & web interaction',
      'Persistent memory & long-term goal tracking',
      'Self-correcting reasoning loops',
    ],
    techStack: ['LangGraph', 'AutoGen', 'Python', 'Redis', 'Docker'],
    deliverables: ['Autonomous Web Research Agent', 'Multi-Agent Workflow Engine', 'Execution Logs UI'],
  },
  {
    visual: 'api',
    num: '08',
    title: 'Enterprise API Integration',
    hook: 'Bridges to legacy environments.',
    desc: 'Secure integrations connecting advanced AI agents to traditional CRM, ERP databases, billing models, and server infrastructure.',
    overview: 'Connect state-of-the-art AI infrastructure to your legacy enterprise software. We build secure REST, GraphQL, and webhook API layers for seamless data flow.',
    features: [
      'Legacy ERP & CRM connectors (Salesforce, SAP, HubSpot)',
      'Enterprise rate-limiting & auto-retry logic',
      'SOC2 & GDPR ready security wrappers',
      'Real-time telemetry & API logging',
    ],
    techStack: ['FastAPI', 'Node.js', 'PostgreSQL', 'Docker', 'OpenAPI'],
    deliverables: ['Middleware API Gateway', 'Secure Webhook Bridge', 'Developer API Documentation'],
  },
]

function ServiceBody({ service, onLearnMore }: { service: ServiceItem; onLearnMore: () => void }) {
  return (
    <>
      <p className="text-sm font-bold text-primary">{service.hook}</p>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{service.desc}</p>

      <ul className="mt-5 max-w-md">
        {service.features.slice(0, 3).map((feature) => (
          <li
            key={feature}
            className="flex items-center justify-between gap-4 border-t border-foreground/10 py-2.5 text-[13px] font-bold text-foreground"
          >
            {feature}
            <span className="size-1.5 shrink-0 rotate-45 bg-sky-brand" />
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {service.techStack.slice(0, 4).map((tech) => (
          <span key={tech} className="rounded-full bg-tint px-3 py-1 text-[11px] font-bold text-foreground/70">
            {tech}
          </span>
        ))}
      </div>

      <ArrowButton size="sm" className="mt-6" onClick={onLearnMore}>
        Learn More
      </ArrowButton>
    </>
  )
}

export function Services() {
  const { openServiceDetail } = useModals()
  const [active, setActive] = useState(0)

  return (
    <section id="services" className="relative px-3 py-6 md:px-5 md:py-10">
      <div className="panel-blue mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] px-5 py-14 md:rounded-[2.75rem] md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 grid items-end gap-6 md:mb-14 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <h2 className="font-sans text-4xl font-extrabold leading-[1.02] headline-tight text-balance md:text-6xl">
                AI solutions and real-world software, <span className="text-[#a9dcff]">engineered for scale.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/80 lg:justify-self-end">
              From intelligent agents to enterprise integrations, we design, build and support the AI your business
              runs on.
            </p>
          </Reveal>

          {/* Desktop: horizontal accordion */}
          <Reveal className="hidden h-[540px] gap-2 lg:flex">
            {services.map((service, i) => {
              const isActive = i === active
              return (
                <div
                  key={service.num}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`relative min-w-[68px] overflow-hidden rounded-[1.75rem] transition-[flex-grow,background-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive ? 'flex-[14_1_0%] bg-white text-foreground' : 'flex-[1_1_0%] cursor-pointer bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {/* Collapsed label */}
                  <button
                    type="button"
                    aria-expanded={isActive}
                    aria-label={service.title}
                    onFocus={() => setActive(i)}
                    className={`absolute inset-0 flex w-[68px] flex-col items-center justify-between py-6 transition-opacity duration-300 ${
                      isActive ? 'pointer-events-none opacity-0' : 'opacity-100'
                    }`}
                  >
                    <span className="font-mono text-xs font-bold text-white/60">{`// 0${service.num}`}</span>
                    <span className="vertical-label whitespace-nowrap text-lg font-bold headline-tight text-white">
                      {service.title}
                    </span>
                  </button>

                  {/* Expanded content (fixed width so text doesn't reflow while the panel grows) */}
                  <div
                    className={`absolute inset-y-0 left-0 flex w-[620px] flex-col p-9 transition-opacity duration-500 ${
                      isActive ? 'opacity-100 delay-200' : 'pointer-events-none opacity-0'
                    }`}
                    aria-hidden={!isActive}
                  >
                    <div className="flex items-start justify-between gap-6">
                      <h3 className="font-sans text-4xl font-extrabold leading-[1.05] headline-tight">
                        {service.title}
                      </h3>
                      <span className="whitespace-nowrap pt-2 font-mono text-sm font-bold text-primary">{`// 0${service.num}`}</span>
                    </div>
                    <div className="mt-5">
                      <ServiceBody service={service} onLearnMore={() => openServiceDetail(service)} />
                    </div>
                  </div>
                </div>
              )
            })}
          </Reveal>

          {/* Mobile / tablet: vertical accordion */}
          <Reveal stagger="[data-card]" staggerSpeed={0.05} className="flex flex-col gap-2 lg:hidden">
            {services.map((service, i) => {
              const isActive = i === active
              return (
                <div
                  key={service.num}
                  data-card
                  className={`overflow-hidden rounded-3xl transition-colors duration-500 ${
                    isActive ? 'bg-white text-foreground' : 'bg-white/10 text-white'
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isActive}
                    onClick={() => setActive(isActive ? -1 : i)}
                    className="flex w-full items-center gap-4 px-5 py-4 text-left cursor-pointer"
                  >
                    <span className={`whitespace-nowrap font-mono text-xs font-bold ${isActive ? 'text-primary' : 'text-white/60'}`}>
                      {`// 0${service.num}`}
                    </span>
                    <span className="flex-1 text-lg font-extrabold headline-tight">{service.title}</span>
                    <Plus
                      className={`size-5 shrink-0 transition-transform duration-300 ${isActive ? 'rotate-45 text-primary' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                      isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-6">
                        <ServiceBody service={service} onLearnMore={() => openServiceDetail(service)} />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
