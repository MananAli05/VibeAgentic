'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, List, ChevronRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { navigate } from '@/lib/router'
import * as React from 'react'

const tocItems = [
  { id: 'notice', label: 'Important Notice' },
  { id: 'section-1', label: '1. Acceptance of Terms' },
  { id: 'section-2', label: '2. User Responsibilities' },
  { id: 'section-3', label: '3. User Accounts' },
  { id: 'section-4', label: '4. Intellectual Property' },
  { id: 'section-5', label: '5. AI Specific Terms' },
  { id: 'section-6', label: '6. Payment & Refunds' },
  { id: 'section-7', label: '7. Third-Party Services' },
  { id: 'section-8', label: '8. Disclaimer of Warranties' },
  { id: 'section-9', label: '9. Limitation of Liability' },
  { id: 'section-10', label: '10. Indemnification' },
  { id: 'section-11', label: '11. Termination' },
  { id: 'section-12', label: '12. Governing Law' },
  { id: 'section-13', label: '13. Severability' },
  { id: 'section-14', label: '14. Changes to Terms' },
  { id: 'section-15', label: '15. Contact Info' },
]

export function TermsConditions() {
  const [activeId, setActiveId] = useState<string>('notice')

  useEffect(() => {
    document.title = 'Terms & Conditions | VibeAgentic AI'
    const metaDesc = document.querySelector('meta[name="description"]')
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : ''
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Terms and Conditions for VibeAgentic AI. Read the agreement details regarding using our AI software and services.'
      )
    }
    return () => {
      document.title = 'VibeAgentic AI — Dream it, we will AI it.'
      if (metaDesc && originalDesc) {
        metaDesc.setAttribute('content', originalDesc)
      }
    }
  }, [])

  const scrollToSection = (id: string) => {
    setActiveId(id)
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -100
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden px-5 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-brand/10 border border-cyan-brand/20 px-3 py-1 text-[10px] font-bold text-cyan-brand uppercase tracking-wider mb-4 w-fit select-none">
              Legal Agreement
            </span>
            <h1 className="font-sans text-4xl font-extrabold headline-tight text-foreground md:text-6xl mb-4">
              Terms & Conditions
            </h1>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground max-w-2xl mx-auto">
              Please read these terms carefully before accessing or using our website and AI-powered services.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[280px_1fr] items-start">
            {/* Sticky Table of Contents Sidebar */}
            <aside className="sticky top-28 hidden lg:block rounded-2xl border border-foreground/10 bg-white p-5 glass-panel">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-cyan-brand mb-4 pb-3 border-b border-foreground/10">
                <List className="size-4" /> Table of Contents
              </div>
              <nav className="flex flex-col gap-1 text-xs max-h-[70vh] overflow-y-auto pr-1">
                {tocItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-left font-medium transition-all ${
                      activeId === item.id
                        ? 'bg-cyan-brand/15 text-cyan-brand font-bold border border-cyan-brand/30'
                        : 'text-muted-foreground hover:bg-primary/10 hover:text-foreground'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="size-3 shrink-0 opacity-60" />
                  </button>
                ))}
              </nav>
            </aside>

            {/* Main Content Area */}
            <div className="border border-foreground/10 bg-primary/[0.05] rounded-[24px] p-6 md:p-10 shadow-[0_24px_82px_rgba(0,0,0,0.3)] backdrop-blur-md text-foreground font-sans text-sm md:text-base leading-[1.8]">
              <div className="mb-8 border-b border-foreground/10 pb-6">
                <p className="text-xs font-mono text-muted-foreground/75 uppercase tracking-wider">
                  Last Updated: February 23, 2026
                </p>
                <p className="text-xs font-mono text-cyan-brand mt-1 uppercase tracking-wider">
                  Legally Binding Agreement
                </p>
              </div>

              {/* Mobile Quick Navigation */}
              <div className="mb-8 rounded-xl border border-foreground/10 bg-primary/[0.05] p-4 lg:hidden">
                <p className="font-mono text-xs font-bold uppercase text-cyan-brand mb-2 flex items-center gap-2">
                  <List className="size-4" /> Quick Section Jump
                </p>
                <select
                  value={activeId}
                  onChange={(e) => scrollToSection(e.target.value)}
                  className="w-full rounded-lg border border-foreground/10 bg-white px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:border-cyan-brand"
                >
                  {tocItems.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-8 text-muted-foreground/90">
                <section className="space-y-3">
                  <p>
                    These Terms and Conditions (&ldquo;Terms&rdquo;) govern your access to and use of the website <a href="https://www.vibeagenticai.com" target="_blank" rel="noopener noreferrer" className="text-cyan-brand hover:underline font-semibold">https://www.vibeagenticai.com</a> and all associated services, including AI consultation, automation and analytics setup, personalized mentorship, business automation tools, AI app integrations, and any other AI‑powered products and services (collectively, the &ldquo;Services&rdquo;) provided by VibeAgentic AI (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
                  </p>
                  <p>
                    By accessing or using the Website or Services, you confirm that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree, please do not use the Website or Services.
                  </p>
                </section>

                <div className="h-px bg-primary/[0.05] w-full" />

                <section id="notice" className="space-y-3 scroll-mt-28">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">Important Notice</h2>
                  <p>
                    These Terms constitute a legally binding agreement between you and VibeAgentic AI. If you are using the Services on behalf of a business or organisation, you represent and warrant that you have authority to bind that entity to these Terms.
                  </p>
                </section>

                <div className="h-px bg-primary/[0.05] w-full" />

                <section id="section-1" className="space-y-3 scroll-mt-28">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">1. Acceptance of Terms</h2>
                  <p>By accessing this Website, you confirm that:</p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>You are at least 18 years of age (or the legal age of majority in your jurisdiction)</li>
                    <li>You have the legal capacity to enter into binding agreements</li>
                    <li>You have read and agree to these Terms and our Privacy Policy</li>
                    <li>If acting on behalf of an organisation, you have authority to bind that organisation</li>
                  </ul>
                  <p>We reserve the right to refuse access to anyone who violates these Terms or applicable laws.</p>
                </section>

                <div className="h-px bg-primary/[0.05] w-full" />

                <section id="section-2" className="space-y-4 scroll-mt-28">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">2. Eligibility and User Responsibilities</h2>
                  
                  <div className="space-y-3">
                    <h3 className="text-base font-bold text-foreground/90">2.1 Eligibility</h3>
                    <p>Our Services are intended for businesses, developers, and professional individuals seeking AI‑powered solutions. By using the Services, you represent that you meet these eligibility requirements.</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h3 className="text-base font-bold text-foreground/90">2.2 Permitted Use</h3>
                    <p>You may use the Website and Services solely for lawful purposes and in accordance with these Terms. Permitted use includes accessing information about our services, using AI tools for your legitimate business needs, and engaging with our consultation and mentorship programs.</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h3 className="text-base font-bold text-foreground/90">2.3 Prohibited Conduct</h3>
                    <p>You agree NOT to:</p>
                    <ul className="list-disc pl-5 space-y-1.5">
                      <li>Use the Website or Services for any unlawful, fraudulent, or malicious purpose</li>
                      <li>Attempt to gain unauthorised access to any part of the Website, servers, or connected systems</li>
                      <li>Reverse engineer, decompile, disassemble, or attempt to derive the source code of any AI models or software</li>
                      <li>Use AI tools to generate content that is illegal, defamatory, obscene, harmful, or misleading</li>
                      <li>Scrape, mine, or extract data from the Website without our express written consent</li>
                      <li>Transmit viruses, malware, spyware, or any other malicious code</li>
                      <li>Impersonate any person or entity, or misrepresent your affiliation</li>
                      <li>Interfere with or disrupt the integrity, performance, or availability of the Website</li>
                      <li>Use the Services to infringe third‑party intellectual property rights</li>
                      <li>Use automated bots, crawlers, or scripts to interact with the Website without permission</li>
                      <li>Circumvent, disable, or interfere with security‑related features of the Website</li>
                    </ul>
                  </div>
                </section>

                <div className="h-px bg-primary/[0.05] w-full" />

                <section id="section-3" className="space-y-3 scroll-mt-28">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">3. User Accounts</h2>
                  <p>Some features of the Website may require you to create an account. By creating an account, you agree to:</p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>Provide accurate, current, and complete registration information</li>
                    <li>Maintain and promptly update your account information to keep it accurate</li>
                    <li>Keep your password secure and confidential</li>
                    <li>Notify us immediately at <a href="mailto:vibeagenticai@gmail.com" className="text-cyan-brand hover:underline font-semibold">vibeagenticai@gmail.com</a> of any suspected unauthorised access</li>
                    <li>Accept full responsibility for all activities that occur under your account</li>
                  </ul>
                  <p>We reserve the right to suspend or terminate accounts that violate these Terms, contain false information, or have been inactive for an extended period, with or without prior notice.</p>
                </section>

                <div className="h-px bg-primary/[0.05] w-full" />

                <section id="section-4" className="space-y-4 scroll-mt-28">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">4. Intellectual Property Rights</h2>
                  
                  <div className="space-y-3">
                    <h3 className="text-base font-bold text-foreground/90">4.1 Our Intellectual Property</h3>
                    <p>All content, features, and functionality on the Website — including but not limited to text, graphics, logos, icons, images, audio clips, AI models, software, source code, and the overall design and architecture of the Services — are the exclusive property of VibeAgentic AI or its licensors and are protected by applicable intellectual property laws worldwide.</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h3 className="text-base font-bold text-foreground/90">4.2 License to Users</h3>
                    <p>Subject to your compliance with these Terms, we grant you a limited, non‑exclusive, non‑transferable, revocable licence to access and use the Website and Services for your own personal or internal business purposes. This licence does not include:</p>
                    <ul className="list-disc pl-5 space-y-1.5">
                      <li>Any resale or commercial distribution of the Services or Website content</li>
                      <li>Modification, adaptation, or creation of derivative works</li>
                      <li>Reverse engineering or extraction of our AI models, algorithms, or source code</li>
                      <li>Use of data mining or automated data collection tools</li>
                    </ul>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h3 className="text-base font-bold text-foreground/90">4.3 Trademarks</h3>
                    <p>&ldquo;VibeAgentic AI,&rdquo; its logo, and all related product names, service names, slogans, and trade dress are trademarks or registered trademarks of VibeAgentic AI. You may not use any of our trademarks, logos, or branding without our prior written consent.</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h3 className="text-base font-bold text-foreground/90">4.4 User‑Generated Content</h3>
                    <p>If you submit content to us, you grant VibeAgentic AI a non‑exclusive, worldwide, royalty‑free licence to use, reproduce, modify, and display that content for the purpose of operating and improving the Services. You represent that you own or have the right to grant this licence.</p>
                  </div>
                </section>

                <div className="h-px bg-primary/[0.05] w-full" />

                <section id="section-5" className="space-y-4 scroll-mt-28">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">5. AI Services — Specific Terms</h2>
                  
                  <div className="space-y-3">
                    <h3 className="text-base font-bold text-foreground/90">5.1 Nature of AI Outputs</h3>
                    <p>Our AI‑powered tools generate outputs based on user inputs and machine learning models. You acknowledge that:</p>
                    <ul className="list-disc pl-5 space-y-1.5">
                      <li>AI outputs are probabilistic and may not always be accurate, complete, or appropriate for your specific use case</li>
                      <li>AI outputs do not constitute professional advice (legal, financial, medical, or otherwise)</li>
                      <li>You are solely responsible for evaluating, validating, and deciding how to use any AI‑generated content</li>
                      <li>We do not guarantee that AI outputs will be free from errors, biases, or inaccuracies</li>
                    </ul>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h3 className="text-base font-bold text-foreground/90">5.2 Prohibited AI Use Cases</h3>
                    <p>You agree not to use our AI Services to generate illegal, harmful, abusive, or discriminatory content; create disinformation or deepfakes; infringe intellectual property rights; or develop competing AI products using our outputs.</p>
                  </div>
                </section>

                <div className="h-px bg-primary/[0.05] w-full" />

                <section id="section-6" className="space-y-4 scroll-mt-28">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">6. Payment, Subscription, and Refund Policy</h2>
                  
                  <div className="space-y-3">
                    <h3 className="text-base font-bold text-foreground/90">6.1 Pricing and Payment</h3>
                    <p>Certain Services are offered on a paid basis. You agree to pay all applicable fees as described on the Website at the time of purchase, providing accurate and authorised billing information. All prices are in USD.</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h3 className="text-base font-bold text-foreground/90">6.2 Subscriptions and Auto‑Renewal</h3>
                    <p>If you subscribe to a recurring service, your subscription will automatically renew at the end of each billing period unless cancelled. You must cancel at least 7 days before the renewal date to avoid being billed for the next period.</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h3 className="text-base font-bold text-foreground/90">6.3 Refund and Cancellation Policy</h3>
                    <p>Refund requests must be submitted within 14 days of the original purchase date and are evaluated on a case-by-case basis. Custom development work, completed consultation sessions, or delivered deliverables are non‑refundable. Contact <a href="mailto:vibeagenticai@gmail.com" className="text-cyan-brand hover:underline font-semibold">vibeagenticai@gmail.com</a> to request a refund.</p>
                  </div>
                </section>

                <div className="h-px bg-primary/[0.05] w-full" />

                <section id="section-7" className="space-y-3 scroll-mt-28">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">7. Third‑Party Links and Services</h2>
                  <p>The Website may contain links to, or integrate with, third‑party websites. We are not responsible for the content, privacy practices, accuracy, or security of any third‑party services, nor any interactions you have with them.</p>
                </section>

                <div className="h-px bg-primary/[0.05] w-full" />

                <section id="section-8" className="space-y-3 scroll-mt-28">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">8. Disclaimer of Warranties</h2>
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground/80">
                    THE WEBSITE AND SERVICES ARE PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, VIBEAGENTIC AI EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON‑INFRINGEMENT.
                  </p>
                </section>

                <div className="h-px bg-primary/[0.05] w-full" />

                <section id="section-9" className="space-y-3 scroll-mt-28">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">9. Limitation of Liability</h2>
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground/80">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, VIBEAGENTIC AI AND ITS DIRECTORS, EMPLOYEES, OR AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR LOSS OF PROFITS, REVENUE, OR DATA. OUR TOTAL CUMULATIVE LIABILITY FOR ALL CLAIMS SHALL NOT EXCEED THE GREATER OF: (A) THE TOTAL AMOUNT PAID BY YOU TO VIBEAGENTIC AI IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR (B) $100 USD.
                  </p>
                </section>

                <div className="h-px bg-primary/[0.05] w-full" />

                <section id="section-10" className="space-y-3 scroll-mt-28">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">10. Indemnification</h2>
                  <p>
                    You agree to defend, indemnify, and hold harmless VibeAgentic AI and its officers, directors, employees, and agents from and against any claims, damages, losses, costs, or fees (including reasonable legal fees) arising out of your violation of these Terms, your use of the Services, or any content you submit through the Website.
                  </p>
                </section>

                <div className="h-px bg-primary/[0.05] w-full" />

                <section id="section-11" className="space-y-3 scroll-mt-28">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">11. Termination</h2>
                  <p>
                    We reserve the right to suspend or terminate your access to the Website or Services at any time, for any reason (including violation of these Terms), with or without notice. You may delete your account by contacting <a href="mailto:vibeagenticai@gmail.com" className="text-cyan-brand hover:underline font-semibold">vibeagenticai@gmail.com</a>.
                  </p>
                </section>

                <div className="h-px bg-primary/[0.05] w-full" />

                <section id="section-12" className="space-y-4 scroll-mt-28">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">12. Governing Law and Dispute Resolution</h2>
                  
                  <div className="space-y-3">
                    <h3 className="text-base font-bold text-foreground/90">12.1 Governing Law</h3>
                    <p>These Terms and any disputes arising out of them shall be governed by and construed in accordance with the laws of Pakistan, without regard to conflict of law provisions.</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h3 className="text-base font-bold text-foreground/90">12.2 Dispute Resolution</h3>
                    <p>In the event of a dispute, both parties agree to first attempt informal resolution by contacting <a href="mailto:vibeagenticai@gmail.com" className="text-cyan-brand hover:underline font-semibold">vibeagenticai@gmail.com</a>. If unresolved after 30 days, we agree to pursue mediation before submitting to the exclusive jurisdiction of the courts in Lahore, Pakistan.</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h3 className="text-base font-bold text-foreground/90">12.3 Class Action Waiver</h3>
                    <p>You agree that any dispute resolution proceedings will be conducted on an individual basis, and not as part of a class or representative action.</p>
                  </div>
                </section>

                <div className="h-px bg-primary/[0.05] w-full" />

                <section id="section-13" className="space-y-3 scroll-mt-28">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">13. Severability and Entire Agreement</h2>
                  <p>
                    If any provision of these Terms is found invalid or unenforceable, it will be modified to the minimum extent necessary, and all other terms will remain in full force. These Terms constitute the entire agreement between you and VibeAgentic AI.
                  </p>
                </section>

                <div className="h-px bg-primary/[0.05] w-full" />

                <section id="section-[#section-14]" className="space-y-3 scroll-mt-28">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">14. Changes to These Terms</h2>
                  <p>
                    We reserve the right to modify these Terms at any time. We will update the date at the top of this document and post a notice on our Website. Continued use of the Services indicates your acceptance of the updated terms.
                  </p>
                </section>

                <div className="h-px bg-primary/[0.05] w-full" />

                <section id="section-15" className="space-y-3 scroll-mt-28">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">15. Contact Information</h2>
                  <p>For any questions or legal inquiries regarding these Terms, please contact us:</p>
                  <div className="grid gap-1 font-sans text-sm">
                    <p><strong>Company:</strong> VibeAgentic AI</p>
                    <p><strong>Website:</strong> <a href="https://www.vibeagenticai.com" target="_blank" rel="noopener noreferrer" className="text-cyan-brand hover:underline font-semibold">https://www.vibeagenticai.com</a></p>
                    <p><strong>Legal Inquiries:</strong> <a href="mailto:vibeagenticai@gmail.com" className="text-cyan-brand hover:underline font-semibold">vibeagenticai@gmail.com</a></p>
                    <p><strong>Support:</strong> <a href="mailto:vibeagenticai@gmail.com" className="text-cyan-brand hover:underline font-semibold">vibeagenticai@gmail.com</a></p>
                  </div>
                </section>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-primary/[0.05] px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-white hover:text-white hover:scale-[1.02] active:scale-100 cursor-pointer"
            >
              <ArrowLeft className="size-4" />
              Back to Home
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
