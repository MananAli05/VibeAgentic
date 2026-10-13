'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, List, ChevronRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { navigate } from '@/lib/router'
import * as React from 'react'

const tocItems = [
  { id: 'scope', label: 'Scope of Policy' },
  { id: 'section-1', label: '1. Information We Collect' },
  { id: 'section-2', label: '2. How We Collect Data' },
  { id: 'section-3', label: '3. How We Use Data' },
  { id: 'section-4', label: '4. Legal Basis (GDPR)' },
  { id: 'section-5', label: '5. Data Sharing & Third Parties' },
  { id: 'section-6', label: '6. Cookies & Tracking' },
  { id: 'section-7', label: '7. Storage & Security' },
  { id: 'section-8', label: '8. Your Rights (GDPR & CCPA)' },
  { id: 'section-9', label: "9. Children's Privacy" },
  { id: 'section-10', label: '10. Third-Party Links' },
  { id: 'section-11', label: '11. Changes to Policy' },
  { id: 'section-12', label: '12. Contact Us' },
]

export function PrivacyPolicy() {
  const [activeId, setActiveId] = useState<string>('scope')

  useEffect(() => {
    document.title = 'Privacy Policy | VibeAgentic AI'
    const metaDesc = document.querySelector('meta[name="description"]')
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : ''
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Privacy Policy for VibeAgentic AI. Learn how we collect, use, disclose, and protect your information.'
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
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-brand/10 border border-cyan-brand/20 px-3.5 py-1 text-[10px] font-bold text-cyan-brand uppercase tracking-wider mb-4 w-fit select-none">
              Legal Document
            </span>
            <h1 className="font-sans text-4xl font-extrabold headline-tight text-foreground md:text-6xl mb-4">
              Privacy Policy
            </h1>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground max-w-2xl mx-auto">
              Your privacy matters to us. This policy explains how VibeAgentic AI collects, uses, and protects your information.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[280px_1fr] items-start">
            {/* Sticky Table of Contents Sidebar */}
            <aside className="sticky top-28 hidden lg:block rounded-2xl border border-foreground/10 bg-white p-5 glass-panel">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-cyan-brand mb-4 pb-3 border-b border-foreground/10">
                <List className="size-4" /> Table of Contents
              </div>
              <nav className="flex flex-col gap-1 text-xs">
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
                  Effective Date: February 23, 2026 | Last Updated: February 23, 2026
                </p>
                <p className="text-xs font-mono text-cyan-brand mt-1 uppercase tracking-wider">
                  Version 1.0 — GDPR & CCPA Compliant
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
                    VibeAgentic AI (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit <a href="https://www.vibeagenticai.com" target="_blank" rel="noopener noreferrer" className="text-cyan-brand hover:underline font-semibold">https://www.vibeagenticai.com</a> and use our AI services, including AI consultation, automation and analytics setup, personalized mentorship, business automation tools, AI app integrations, and other AI‑powered products and services (collectively, the &ldquo;Services&rdquo;).
                  </p>
                  <p>
                    Please read this policy carefully. By using our Website or Services, you agree to the practices described below. If you do not agree, please discontinue use immediately.
                  </p>
                </section>

                <div className="h-px bg-primary/[0.05] w-full" />

                <section id="scope" className="space-y-3 scroll-mt-28">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">Scope of This Policy</h2>
                  <p>
                    This policy applies to all personal data processed by VibeAgentic AI, whether you are a visitor, registered user, client, or newsletter subscriber. It covers data collected online and through any communications you have with us.
                  </p>
                </section>

                <div className="h-px bg-primary/[0.05] w-full" />

                <section id="section-1" className="space-y-4 scroll-mt-28">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">1. Information We Collect</h2>
                  
                  <div className="space-y-3">
                    <h3 className="text-base font-bold text-foreground/90">1.1 Personal Information You Provide</h3>
                    <p>We collect information that you voluntarily provide when you interact with our Website or Services:</p>
                    <ul className="list-disc pl-5 space-y-1.5">
                      <li>Full name and display name</li>
                      <li>Email address</li>
                      <li>Phone number (if provided via contact forms)</li>
                      <li>Company name and job title</li>
                      <li>Billing and payment information (processed securely by third‑party payment processors — we do not store full card details)</li>
                      <li>Messages, inquiries, and feedback you submit via forms or email</li>
                      <li>Preferences and settings you configure within your account</li>
                      <li>Any other information you voluntarily submit</li>
                    </ul>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h3 className="text-base font-bold text-foreground/90">1.2 Information Collected Automatically</h3>
                    <p>When you visit our Website, certain data is collected automatically through cookies, log files, and similar technologies:</p>
                    <ul className="list-disc pl-5 space-y-1.5">
                      <li>IP address and approximate geographic location</li>
                      <li>Browser type, version, and language settings</li>
                      <li>Device type, operating system, and screen resolution</li>
                      <li>Pages visited, time on each page, and navigation paths</li>
                      <li>Referring and exit URLs</li>
                      <li>Date and time of each visit</li>
                      <li>Clickstream data and interaction events</li>
                    </ul>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h3 className="text-base font-bold text-foreground/90">1.3 AI Interaction Data</h3>
                    <p>When you use our AI‑powered tools or services, we may collect:</p>
                    <ul className="list-disc pl-5 space-y-1.5">
                      <li>Inputs, prompts, or queries you submit to AI systems</li>
                      <li>Outputs generated in response to your inputs</li>
                      <li>Usage patterns and feature preferences within AI tools</li>
                    </ul>
                    <p className="text-xs text-muted-foreground/75 italic">
                      We use this data to deliver, improve, and personalise our AI services. We do not use your specific prompts or outputs to train shared AI models without your explicit consent.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h3 className="text-base font-bold text-foreground/90">1.4 Information from Third Parties</h3>
                    <p>
                      We may receive information about you from third‑party sources such as analytics providers, advertising partners, social media platforms (if you connect an account), and payment processors, in accordance with their respective privacy policies.
                    </p>
                  </div>
                </section>

                <div className="h-px bg-primary/[0.05] w-full" />

                <section id="section-2" className="space-y-3 scroll-mt-28">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">2. How We Collect Information</h2>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>Contact and registration forms on the Website</li>
                    <li>Newsletter subscription sign‑ups</li>
                    <li>Cookies, web beacons, and tracking pixels (see Section 6)</li>
                    <li>Analytics platforms such as Google Analytics</li>
                    <li>API integrations and third‑party service connections</li>
                    <li>Email communications and responses</li>
                    <li>Payment processing systems</li>
                    <li>Live chat or support tools (if enabled)</li>
                  </ul>
                </section>

                <div className="h-px bg-primary/[0.05] w-full" />

                <section id="section-3" className="space-y-4 scroll-mt-28">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">3. How We Use Your Information</h2>
                  
                  <div className="space-y-3">
                    <h3 className="text-base font-bold text-foreground/90">3.1 Service Delivery</h3>
                    <ul className="list-disc pl-5 space-y-1.5">
                      <li>To create and manage your account</li>
                      <li>To provide AI consultation, automation, analytics, mentorship, and other requested Services</li>
                      <li>To process transactions and send related confirmations and receipts</li>
                      <li>To respond to your inquiries and provide customer support</li>
                    </ul>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h3 className="text-base font-bold text-foreground/90">3.2 Communication</h3>
                    <ul className="list-disc pl-5 space-y-1.5">
                      <li>To send service‑related notifications and updates</li>
                      <li>To deliver newsletters and marketing emails (with your consent)</li>
                      <li>To notify you of changes to our Services, policies, or terms</li>
                    </ul>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h3 className="text-base font-bold text-foreground/90">3.3 Improvement and Research</h3>
                    <ul className="list-disc pl-5 space-y-1.5">
                      <li>To analyse usage trends and improve Website functionality and user experience</li>
                      <li>To develop new features, products, and services</li>
                      <li>To conduct internal research and quality assurance</li>
                    </ul>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h3 className="text-base font-bold text-foreground/90">3.4 Legal and Security</h3>
                    <ul className="list-disc pl-5 space-y-1.5">
                      <li>To detect, prevent, and address fraud, abuse, or security incidents</li>
                      <li>To comply with applicable legal obligations and regulatory requirements</li>
                      <li>To enforce our Terms and Conditions and protect our rights</li>
                    </ul>
                  </div>
                </section>

                <div className="h-px bg-primary/[0.05] w-full" />

                <section id="section-4" className="space-y-3 scroll-mt-28">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">4. Legal Basis for Processing (GDPR)</h2>
                  <p>If you are located in the European Economic Area (EEA) or United Kingdom, we process your personal data under the following lawful bases:</p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li><strong>Contractual Necessity:</strong> To perform the contract we have with you (e.g., providing Services you have requested or purchased).</li>
                    <li><strong>Legitimate Interests:</strong> To improve our Website and Services, prevent fraud, and communicate relevant information about our business.</li>
                    <li><strong>Consent:</strong> Where you have provided explicit consent, such as for marketing emails or non‑essential cookies. You may withdraw consent at any time.</li>
                    <li><strong>Legal Obligation:</strong> Where processing is necessary to comply with applicable laws or regulatory requirements.</li>
                  </ul>
                </section>

                <div className="h-px bg-primary/[0.05] w-full" />

                <section id="section-5" className="space-y-4 scroll-mt-28">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">5. Data Sharing and Third‑Party Services</h2>
                  <p>We do not sell your personal information. We may share your data with trusted third parties only as described below:</p>
                  
                  <div className="space-y-3">
                    <h3 className="text-base font-bold text-foreground/90">5.1 Service Providers</h3>
                    <p>We engage third‑party vendors who process data on our behalf, including:</p>
                    <ul className="list-disc pl-5 space-y-1.5">
                      <li>Cloud hosting and infrastructure (e.g., AWS, Google Cloud, Azure)</li>
                      <li>Analytics platforms (e.g., Google Analytics, Mixpanel)</li>
                      <li>Email marketing tools (e.g., Mailchimp, ConvertKit, SendGrid)</li>
                      <li>Payment processors (e.g., Stripe, PayPal)</li>
                      <li>Customer relationship management (CRM) systems</li>
                      <li>AI platform providers and API services</li>
                    </ul>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h3 className="text-base font-bold text-foreground/90">5.2 Legal and Regulatory Disclosure</h3>
                    <p>
                      We may disclose your information if required by law, court order, or governmental authority, or where we believe disclosure is necessary to protect our rights, your safety, or the safety of others.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h3 className="text-base font-bold text-foreground/90">5.3 Business Transfers</h3>
                    <p>
                      In the event of a merger, acquisition, restructuring, or sale of assets, your personal data may be transferred as part of that transaction. We will notify you before your data becomes subject to a different privacy policy.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h3 className="text-base font-bold text-foreground/90">5.4 With Your Consent</h3>
                    <p>
                      We may share your information with third parties in any other case where you have provided explicit consent.
                    </p>
                  </div>
                </section>

                <div className="h-px bg-primary/[0.05] w-full" />

                <section id="section-6" className="space-y-4 scroll-mt-28">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">6. Cookies and Tracking Technologies</h2>
                  <p>We use cookies and similar tracking technologies to enhance your experience on our Website. A cookie is a small text file stored on your device.</p>
                  
                  <div className="space-y-3">
                    <h3 className="text-base font-bold text-foreground/90">6.1 Types of Cookies We Use</h3>
                    <ul className="list-disc pl-5 space-y-1.5">
                      <li><strong>Essential Cookies:</strong> Required for the Website to function correctly (e.g., session management, security). Cannot be disabled.</li>
                      <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our Website (e.g., Google Analytics). Used to improve performance.</li>
                      <li><strong>Preference Cookies:</strong> Remember your settings and preferences for a personalised experience.</li>
                      <li><strong>Marketing Cookies:</strong> Used to deliver relevant content and advertisements based on your interests.</li>
                    </ul>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h3 className="text-base font-bold text-foreground/90">6.2 Managing Cookies</h3>
                    <p>
                      You can control and manage cookies through your browser settings. You may also opt out of Google Analytics by installing the Google Analytics Opt‑out Browser Add‑on. Please note that disabling certain cookies may affect Website functionality.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h3 className="text-base font-bold text-foreground/90">6.3 Cookie Consent</h3>
                    <p>
                      Where required by law (e.g., under GDPR or PECR), we will request your consent before placing non‑essential cookies. You can update your cookie preferences at any time via our cookie settings banner.
                    </p>
                  </div>
                </section>

                <div className="h-px bg-primary/[0.05] w-full" />

                <section id="section-7" className="space-y-4 scroll-mt-28">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">7. Data Storage and Security</h2>
                  <p>We implement industry‑standard technical and organisational security measures to protect your personal data, including:</p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>SSL/TLS encryption for data transmission</li>
                    <li>Encrypted storage for data at rest</li>
                    <li>Access controls and role‑based permissions</li>
                    <li>Regular security audits and vulnerability assessments</li>
                    <li>Secure, reputable third‑party infrastructure providers</li>
                  </ul>

                  <div className="space-y-3 pt-2">
                    <h3 className="text-base font-bold text-foreground/90">7.1 Data Retention</h3>
                    <p>We retain your personal data only for as long as necessary to fulfil the purposes outlined in this policy, unless a longer retention period is required or permitted by law. Typical retention periods are:</p>
                    <ul className="list-disc pl-5 space-y-1.5">
                      <li><strong>Account data:</strong> Retained for the duration of your account plus 2 years after closure</li>
                      <li><strong>Transaction records:</strong> Retained for 7 years for legal and accounting purposes</li>
                      <li><strong>Marketing data:</strong> Until you unsubscribe or withdraw consent</li>
                      <li><strong>Usage logs:</strong> Retained for 12 months for security and performance purposes</li>
                    </ul>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h3 className="text-base font-bold text-foreground/90">7.2 International Data Transfers</h3>
                    <p>
                      VibeAgentic AI operates globally. Your data may be transferred to and processed in countries outside your jurisdiction. Where required (e.g., for EEA residents), we rely on appropriate safeguards such as Standard Contractual Clauses (SCCs) to protect your data.
                    </p>
                  </div>
                </section>

                <div className="h-px bg-primary/[0.05] w-full" />

                <section id="section-8" className="space-y-4 scroll-mt-28">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">8. Your Rights</h2>
                  
                  <div className="space-y-3">
                    <h3 className="text-base font-bold text-foreground/90">8.1 Rights Under GDPR (EEA / UK Users)</h3>
                    <p>If you are located in the EEA or UK, you have the following rights:</p>
                    <ul className="list-disc pl-5 space-y-1.5">
                      <li><strong>Right to Access:</strong> Request a copy of the personal data we hold about you.</li>
                      <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data.</li>
                      <li><strong>Right to Erasure:</strong> Request deletion of your personal data (&ldquo;right to be forgotten&rdquo;).</li>
                      <li><strong>Right to Restrict Processing:</strong> Request that we limit how we process your data.</li>
                      <li><strong>Right to Data Portability:</strong> Receive your data in a structured, machine‑readable format.</li>
                      <li><strong>Right to Object:</strong> Object to processing based on legitimate interests or for direct marketing.</li>
                      <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time.</li>
                    </ul>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h3 className="text-base font-bold text-foreground/90">8.2 Rights Under CCPA (California Residents)</h3>
                    <p>If you are a California resident, you have the right to:</p>
                    <ul className="list-disc pl-5 space-y-1.5">
                      <li>Know what personal information we collect, use, and disclose</li>
                      <li>Delete your personal information</li>
                      <li>Non‑discrimination for exercising your rights</li>
                    </ul>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h3 className="text-base font-bold text-foreground/90">8.3 How to Exercise Your Rights</h3>
                    <p>
                      To exercise any of your rights, please email us at <a href="mailto:vibeagenticai@gmail.com" className="text-cyan-brand hover:underline font-semibold">vibeagenticai@gmail.com</a>. We will respond within 30 days.
                    </p>
                  </div>
                </section>

                <div className="h-px bg-primary/[0.05] w-full" />

                <section id="section-9" className="space-y-3 scroll-mt-28">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">9. Children's Privacy</h2>
                  <p>
                    Our Website and Services are not directed to individuals under the age of 13. We do not knowingly collect personal data from children. If you believe your child has provided us with personal information, please email us at <a href="mailto:vibeagenticai@gmail.com" className="text-cyan-brand hover:underline font-semibold">vibeagenticai@gmail.com</a> to have it deleted.
                  </p>
                </section>

                <div className="h-px bg-primary/[0.05] w-full" />

                <section id="section-10" className="space-y-3 scroll-mt-28">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">10. Links to Third‑Party Websites</h2>
                  <p>
                    Our Website may contain links to external sites not operated by VibeAgentic AI. We are not responsible for the content or privacy practices of these third‑party sites.
                  </p>
                </section>

                <div className="h-px bg-primary/[0.05] w-full" />

                <section id="section-11" className="space-y-3 scroll-mt-28">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">11. Changes to This Privacy Policy</h2>
                  <p>
                    We may update this Privacy Policy periodically. We will notify you of any material changes by updating the date at the top of this page or posting a notice on our website.
                  </p>
                </section>

                <div className="h-px bg-primary/[0.05] w-full" />

                <section id="section-12" className="space-y-3 scroll-mt-28">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">12. Contact Us</h2>
                  <p>If you have any questions or concerns regarding this policy, please contact us:</p>
                  <div className="grid gap-1 font-sans text-sm">
                    <p><strong>Company:</strong> VibeAgentic AI</p>
                    <p><strong>Website:</strong> <a href="https://www.vibeagenticai.com" target="_blank" rel="noopener noreferrer" className="text-cyan-brand hover:underline font-semibold">https://www.vibeagenticai.com</a></p>
                    <p><strong>Email:</strong> <a href="mailto:vibeagenticai@gmail.com" className="text-cyan-brand hover:underline font-semibold">vibeagenticai@gmail.com</a></p>
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
