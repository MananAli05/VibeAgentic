// Content for the trust-building sections (components/trust.tsx).
// Everything here is a promise to visitors, so keep it true: edit freely, but do not add
// numbers, client names or quotes that cannot be backed up.

export interface EngagementOption {
  name: string
  tag?: string
  desc: string
  bestFor: string
  youGet: string
  /** 1 (lightest commitment) to 4 (largest) */
  commitment: 1 | 2 | 3 | 4
  cta: 'call' | 'project'
}

/** "Where to start": smaller, cheaper ways in before a full build. */
export const engagementOptions: EngagementOption[] = [
  {
    name: 'Strategy Call',
    tag: 'Start here',
    desc: 'A no-obligation conversation about your goals, your data and whether AI is the right fit at all.',
    bestFor: 'Exploring an idea',
    youGet: 'An honest read on feasibility, including when not to build.',
    commitment: 1,
    cta: 'call',
  },
  {
    name: 'AI Opportunity Audit',
    desc: 'We map one or two of your workflows, find where AI saves time or money, and rank the options by effort and return.',
    bestFor: 'Teams unsure where to begin',
    youGet: 'A written roadmap with ready-made and custom options side by side.',
    commitment: 2,
    cta: 'call',
  },
  {
    name: 'Pilot Project',
    desc: 'One workflow, built on your real data, so you can measure the results before committing to a larger build.',
    bestFor: 'Proving the return first',
    youGet: 'A working pilot and the numbers to decide what comes next.',
    commitment: 3,
    cta: 'project',
  },
  {
    name: 'Full Build & Support',
    desc: 'Production-grade systems with integrations, security, staff training and continuous tuning after launch.',
    bestFor: 'Scaling what works',
    youGet: 'A system your team owns, with a support plan.',
    commitment: 4,
    cta: 'project',
  },
]

export interface Value {
  title: string
  desc: string
}

/** "Why TryAzog": how we work, in our own words. */
export const values: Value[] = [
  {
    title: 'Honest advice first',
    desc: 'We recommend the simplest thing that works. Sometimes that is an existing tool, sometimes it is not AI at all.',
  },
  {
    title: 'Work directly with the builders',
    desc: 'You talk to the engineers who design and ship your system, not a chain of account managers.',
  },
  {
    title: 'Prove value before scaling',
    desc: 'A pilot on your real data comes before a big budget, so every next step is backed by results.',
  },
  {
    title: 'Clear price before work starts',
    desc: 'You get a written proposal with scope, deliverables and cost before anything begins. No surprise invoices.',
  },
  {
    title: 'You own what we build',
    desc: 'Ownership of the code, models and data is agreed in writing up front, so you are never locked in.',
  },
  {
    title: 'Security by default',
    desc: 'Least-privilege data access, NDAs on request, and deployment in your own cloud when data must stay in-house.',
  },
]

export type Mark = 'yes' | 'no' | 'partial'

export interface ComparisonRow {
  label: string
  /** TryAzog, off-the-shelf AI tools, freelancer, large agency */
  cells: [Mark, Mark, Mark, Mark]
  notes?: [string?, string?, string?, string?]
}

export const comparisonColumns = ['TryAzog', 'Off-the-shelf AI tools', 'Freelancer', 'Large agency'] as const
/** Shorter labels for the phone layout */
export const comparisonColumnsShort = ['TryAzog', 'Ready-made tools', 'Freelancer', 'Large agency'] as const

export const comparisonRows: ComparisonRow[] = [
  { label: 'Built around your exact workflow', cells: ['yes', 'partial', 'yes', 'yes'], notes: [, 'Generic'] },
  { label: 'Talk directly to the engineers', cells: ['yes', 'no', 'yes', 'partial'], notes: [, , , 'Rarely'] },
  { label: 'Start with a small pilot', cells: ['yes', 'yes', 'partial', 'partial'], notes: [, 'Free trial', 'Varies', 'Rarely'] },
  { label: 'Integrations, security & support after launch', cells: ['yes', 'partial', 'partial', 'yes'], notes: [, 'Limited', 'Varies'] },
  { label: 'You own the code and data', cells: ['yes', 'no', 'partial', 'partial'], notes: [, , 'Varies', 'Varies'] },
]

export interface ClientStory {
  client: string
  industry: string
  /** What was going wrong, in the client's terms */
  situation: string
  /** The alternatives the client weighed before choosing (off-the-shelf tool, hiring, doing nothing...) */
  optionsConsidered: string[]
  /** Why they chose TryAzog: the decision, in their words if possible */
  whyChose: string
  built: string
  results: { value: string; label: string }[]
  quote?: { text: string; name: string; role: string }
  /** Optional link the visitor can use to verify the story (LinkedIn post, client site, Clutch review) */
  proofUrl?: string
}

/**
 * Real client stories only. The section stays hidden until at least one is added.
 * Template:
 * {
 *   client: 'Company name (or "A 40-person logistics firm" if anonymous)',
 *   industry: 'Logistics',
 *   situation: 'Two staff spent ~20 hours a week copying delivery notes into the ERP.',
 *   optionsConsidered: ['An off-the-shelf OCR tool', 'Hiring another admin', 'A custom extraction pipeline'],
 *   whyChose: 'The OCR tool could not read handwritten notes; a pilot on our real documents proved it would work.',
 *   built: 'A document-extraction pipeline that writes straight into the ERP, with human review for low-confidence fields.',
 *   results: [{ value: '18 hrs', label: 'saved per week' }],
 *   quote: { text: '...', name: 'Full Name', role: 'Operations Manager' },
 *   proofUrl: 'https://www.linkedin.com/...',
 * }
 */
export const clientStories: ClientStory[] = []

export interface NextStep {
  title: string
  desc: string
}

/** "What happens after you reach out" */
export const nextSteps: NextStep[] = [
  {
    title: 'You tell us what you need',
    desc: 'Send the form or book a call. A few lines about the problem is enough.',
  },
  {
    title: 'We reply within 24 hours',
    desc: 'A real person reads your message and suggests a time to talk.',
  },
  {
    title: 'Discovery call',
    desc: 'We ask about your workflow, data and goals, and tell you honestly whether AI is a good fit.',
  },
  {
    title: 'Written proposal with options',
    desc: 'Scope, cost and timeline, including a smaller starting option where it makes sense.',
  },
  {
    title: 'You decide',
    desc: 'Start with a pilot or a full build. Nothing begins until you approve the proposal.',
  },
]
