'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Calendar, AlertCircle, Loader2 } from 'lucide-react'
import { useModals } from '@/lib/modal-context'
import { sendForm, CONTACT_EMAIL } from '@/lib/send-form'

const inputBaseClass =
  'rounded-xl border bg-white px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 transition-all duration-300 focus:bg-white focus:outline-none w-full'

export function ModalManager() {
  const {
    activeModal,
    selectedService,
    selectedIndustry,
    preselectedServiceId,
    openStartProject,
    openStrategyCall,
    closeModal,
  } = useModals()

  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: preselectedServiceId || 'Generative AI Integration',
    budget: '$5k - $15k',
    timeline: '1-2 Months',
    message: '',
    date: '',
    time: '10:00 AM',
    topic: 'AI Automation Strategy',
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
    date: '',
  })

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
    date: false,
  })

  useEffect(() => {
    if (preselectedServiceId) {
      setFormData((prev) => ({ ...prev, service: preselectedServiceId }))
    }
  }, [preselectedServiceId])

  useEffect(() => {
    setSubmitted(false)
    setSending(false)
    setSendError('')
    setFormData({
      name: '',
      email: '',
      service: preselectedServiceId || 'Generative AI Integration',
      budget: '$5k - $15k',
      timeline: '1-2 Months',
      message: '',
      date: '',
      time: '10:00 AM',
      topic: 'AI Automation Strategy',
    })
    setErrors({ name: '', email: '', message: '', date: '' })
    setTouched({ name: false, email: false, message: false, date: false })
  }, [activeModal])

  if (!activeModal) return null

  const validateName = (name: string): string => {
    const trimmed = name.trim()
    if (!trimmed) return 'Name is required'
    if (trimmed.length < 2) return 'Name must be at least 2 characters long'
    const nameRegex = /^[a-zA-Z\s'-]{2,50}$/
    if (!nameRegex.test(trimmed)) return 'Please enter a valid name (letters, spaces, hyphens only)'
    return ''
  }

  const validateEmail = (email: string): string => {
    const trimmed = email.trim()
    if (!trimmed) return 'Email is required'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmed)) return 'Please enter a valid email address'
    return ''
  }

  const validateMessage = (message: string): string => {
    const trimmed = message.trim()
    if (!trimmed) return 'Message is required'
    if (trimmed.length < 10) return 'Message must be at least 10 characters long'
    return ''
  }

  const validateDate = (date: string): string => {
    if (!date) return 'Please select a date'
    return ''
  }

  const handleBlur = (field: 'name' | 'email' | 'message' | 'date') => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    if (field === 'name') setErrors((prev) => ({ ...prev, name: validateName(formData.name) }))
    else if (field === 'email') setErrors((prev) => ({ ...prev, email: validateEmail(formData.email) }))
    else if (field === 'message') setErrors((prev) => ({ ...prev, message: validateMessage(formData.message) }))
    else if (field === 'date') setErrors((prev) => ({ ...prev, date: validateDate(formData.date) }))
  }

  const submit = async (subject: string, fields: Record<string, string>) => {
    setSending(true)
    setSendError('')
    try {
      await sendForm(subject, fields)
      setSubmitted(true)
    } catch {
      setSendError(`Something went wrong. Please try again or email us at ${CONTACT_EMAIL}.`)
    } finally {
      setSending(false)
    }
  }

  const handleStartProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nameErr = validateName(formData.name)
    const emailErr = validateEmail(formData.email)
    const messageErr = validateMessage(formData.message)

    setTouched({ name: true, email: true, message: true, date: false })
    setErrors((prev) => ({ ...prev, name: nameErr, email: emailErr, message: messageErr }))

    if (nameErr || emailErr || messageErr) return
    submit('New project request — VibeAgentic website', {
      name: formData.name.trim(),
      email: formData.email.trim(),
      service: formData.service,
      budget: formData.budget,
      timeline: formData.timeline,
      message: formData.message.trim(),
    })
  }

  const handleStrategyCallSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nameErr = validateName(formData.name)
    const emailErr = validateEmail(formData.email)
    const dateErr = validateDate(formData.date)

    setTouched({ name: true, email: true, message: false, date: true })
    setErrors((prev) => ({ ...prev, name: nameErr, email: emailErr, date: dateErr }))

    if (nameErr || emailErr || dateErr) return
    submit('New strategy call booking — VibeAgentic website', {
      name: formData.name.trim(),
      email: formData.email.trim(),
      topic: formData.topic,
      date: formData.date,
      time: formData.time,
      notes: formData.message.trim() || '—',
    })
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#0b1a33]/45 p-4 backdrop-blur-md sm:p-6"
        onClick={handleBackdropClick}
      >
        {/* START A PROJECT MODAL */}
        {activeModal === 'start-project' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-foreground/10 bg-white p-6 shadow-[0_40px_90px_-30px_rgba(11,26,51,0.45)] md:p-8"
          >
            <button
              onClick={closeModal}
              className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-full bg-primary/[0.05] text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground cursor-pointer"
              aria-label="Close modal"
            >
              <X className="size-5" />
            </button>

            {submitted ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 text-center">
                <span className="flex size-14 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                  <Check className="size-7" />
                </span>
                <h3 className="font-sans text-2xl font-extrabold text-foreground">
                  Project Request Submitted
                </h3>
                <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
                  Thank you. Our engineering team will review your project details and get back to you within 24 hours.
                </p>
                <button
                  onClick={closeModal}
                  className="mt-4 rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-white transition-opacity hover:opacity-90 cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                    Start a Project
                  </span>
                  <h2 className="mt-1 font-sans text-2xl font-extrabold text-foreground md:text-3xl">
                    Let's Build Your AI System
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Provide your requirements below and we will prepare a complete solution proposal.
                  </p>
                </div>

                <form onSubmit={handleStartProjectSubmit} className="grid gap-4" noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="block font-sans text-xs font-bold text-foreground">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => {
                          const val = e.target.value
                          setFormData({ ...formData, name: val })
                          if (touched.name) setErrors((prev) => ({ ...prev, name: validateName(val) }))
                        }}
                        onBlur={() => handleBlur('name')}
                        className={`${inputBaseClass} ${
                          errors.name
                            ? 'border-red-500/80 focus:border-red-500'
                            : 'border-foreground/10 focus:border-primary/60'
                        }`}
                      />
                      {errors.name && (
                        <span className="flex items-center gap-1 text-[11px] text-red-600">
                          <AlertCircle className="size-3 shrink-0" />
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="block font-sans text-xs font-bold text-foreground">
                        Work Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => {
                          const val = e.target.value
                          setFormData({ ...formData, email: val })
                          if (touched.email) setErrors((prev) => ({ ...prev, email: validateEmail(val) }))
                        }}
                        onBlur={() => handleBlur('email')}
                        className={`${inputBaseClass} ${
                          errors.email
                            ? 'border-red-500/80 focus:border-red-500'
                            : 'border-foreground/10 focus:border-primary/60'
                        }`}
                      />
                      {errors.email && (
                        <span className="flex items-center gap-1 text-[11px] text-red-600">
                          <AlertCircle className="size-3 shrink-0" />
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="block font-sans text-xs font-bold text-foreground">
                        Service Needed
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className={`${inputBaseClass} border-foreground/10 bg-white text-foreground focus:border-primary/60`}
                      >
                        <option value="Generative AI Integration" className="bg-white text-foreground">Generative AI</option>
                        <option value="RAG Applications" className="bg-white text-foreground">RAG Applications</option>
                        <option value="AI Process Automation" className="bg-white text-foreground">AI Automation</option>
                        <option value="Custom AI Chatbots" className="bg-white text-foreground">AI Chatbots</option>
                        <option value="AI Copilots & Assistants" className="bg-white text-foreground">AI Copilots</option>
                        <option value="LLM Tuning & Training" className="bg-white text-foreground">LLM Tuning</option>
                        <option value="Autonomous AI Agents" className="bg-white text-foreground">AI Agents</option>
                        <option value="Enterprise API Integration" className="bg-white text-foreground">API Integration</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="block font-sans text-xs font-bold text-foreground">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className={`${inputBaseClass} border-foreground/10 bg-white text-foreground focus:border-primary/60`}
                      >
                        <option value="Under $5k" className="bg-white text-foreground">Under $5k</option>
                        <option value="$5k - $15k" className="bg-white text-foreground">$5k - $15k</option>
                        <option value="$15k - $30k" className="bg-white text-foreground">$15k - $30k</option>
                        <option value="$30k+" className="bg-white text-foreground">$30k+</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="block font-sans text-xs font-bold text-foreground">
                        Target Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className={`${inputBaseClass} border-foreground/10 bg-white text-foreground focus:border-primary/60`}
                      >
                        <option value="ASAP (< 2 weeks)" className="bg-white text-foreground">ASAP (&lt; 2 weeks)</option>
                        <option value="1-2 Months" className="bg-white text-foreground">1-2 Months</option>
                        <option value="3+ Months" className="bg-white text-foreground">3+ Months</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="block font-sans text-xs font-bold text-foreground">
                      Project Goals & Requirements
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Briefly describe your objectives and scope..."
                      value={formData.message}
                      onChange={(e) => {
                        const val = e.target.value
                        setFormData({ ...formData, message: val })
                        if (touched.message) setErrors((prev) => ({ ...prev, message: validateMessage(val) }))
                      }}
                      onBlur={() => handleBlur('message')}
                      className={`${inputBaseClass} resize-none leading-relaxed ${
                        errors.message
                          ? 'border-red-500/80 focus:border-red-500'
                          : 'border-foreground/10 focus:border-primary/60'
                      }`}
                    />
                    {errors.message && (
                      <span className="flex items-center gap-1 text-[11px] text-red-600">
                        <AlertCircle className="size-3 shrink-0" />
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {sendError && (
                    <span className="flex items-center gap-1 text-xs text-red-600">
                      <AlertCircle className="size-3.5 shrink-0" />
                      {sendError}
                    </span>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="disabled:opacity-70 disabled:cursor-wait mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-bold text-white transition-all hover:bg-[#0f57d8] hover:shadow-[0_14px_30px_-12px_rgba(22,103,242,0.7)] cursor-pointer"
                  >
                    {sending ? <><Loader2 className="size-4 animate-spin" /> Sending...</> : 'Submit Project Details'}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}

        {/* BOOK A STRATEGY CALL MODAL */}
        {activeModal === 'strategy-call' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-foreground/10 bg-white p-6 shadow-[0_40px_90px_-30px_rgba(11,26,51,0.45)] md:p-8"
          >
            <button
              onClick={closeModal}
              className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-full bg-primary/[0.05] text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground cursor-pointer"
              aria-label="Close modal"
            >
              <X className="size-5" />
            </button>

            {submitted ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 text-center">
                <span className="flex size-14 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                  <Check className="size-7" />
                </span>
                <h3 className="font-sans text-2xl font-extrabold text-foreground">
                  Strategy Call Scheduled
                </h3>
                <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
                  We have reserved your consultation call. A meeting invite has been sent to your email address.
                </p>
                <button
                  onClick={closeModal}
                  className="mt-4 rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-white transition-opacity hover:opacity-90 cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                    Book a Strategy Call
                  </span>
                  <h2 className="mt-1 font-sans text-2xl font-extrabold text-foreground md:text-3xl">
                    Schedule a Consultation
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Discuss your technical roadmap and AI feasibility directly with our engineering team.
                  </p>
                </div>

                <form onSubmit={handleStrategyCallSubmit} className="grid gap-4" noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="block font-sans text-xs font-bold text-foreground">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => {
                          const val = e.target.value
                          setFormData({ ...formData, name: val })
                          if (touched.name) setErrors((prev) => ({ ...prev, name: validateName(val) }))
                        }}
                        onBlur={() => handleBlur('name')}
                        className={`${inputBaseClass} ${
                          errors.name
                            ? 'border-red-500/80 focus:border-red-500'
                            : 'border-foreground/10 focus:border-primary/60'
                        }`}
                      />
                      {errors.name && (
                        <span className="flex items-center gap-1 text-[11px] text-red-600">
                          <AlertCircle className="size-3 shrink-0" />
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="block font-sans text-xs font-bold text-foreground">
                        Work Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => {
                          const val = e.target.value
                          setFormData({ ...formData, email: val })
                          if (touched.email) setErrors((prev) => ({ ...prev, email: validateEmail(val) }))
                        }}
                        onBlur={() => handleBlur('email')}
                        className={`${inputBaseClass} ${
                          errors.email
                            ? 'border-red-500/80 focus:border-red-500'
                            : 'border-foreground/10 focus:border-primary/60'
                        }`}
                      />
                      {errors.email && (
                        <span className="flex items-center gap-1 text-[11px] text-red-600">
                          <AlertCircle className="size-3 shrink-0" />
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="block font-sans text-xs font-bold text-foreground">
                      Consultation Topic
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className={`${inputBaseClass} border-foreground/10 bg-white text-foreground focus:border-primary/60`}
                    >
                      <option value="AI Automation Strategy" className="bg-white text-foreground">AI Automation Strategy & Roadmap</option>
                      <option value="Custom RAG & Enterprise Search" className="bg-white text-foreground">Custom RAG & Enterprise Search</option>
                      <option value="LLM Fine-Tuning & Self-Hosting" className="bg-white text-foreground">LLM Fine-Tuning & Self-Hosting</option>
                      <option value="Autonomous Agent Architecture" className="bg-white text-foreground">Autonomous Agent Architecture</option>
                    </select>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="block font-sans text-xs font-bold text-foreground">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => {
                          const val = e.target.value
                          setFormData({ ...formData, date: val })
                          if (touched.date) setErrors((prev) => ({ ...prev, date: validateDate(val) }))
                        }}
                        onBlur={() => handleBlur('date')}
                        className={`${inputBaseClass} bg-white text-foreground ${
                          errors.date
                            ? 'border-red-500/80 focus:border-red-500'
                            : 'border-foreground/10 focus:border-primary/60'
                        }`}
                      />
                      {errors.date && (
                        <span className="flex items-center gap-1 text-[11px] text-red-600">
                          <AlertCircle className="size-3 shrink-0" />
                          {errors.date}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="block font-sans text-xs font-bold text-foreground">
                        Preferred Time Slot
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className={`${inputBaseClass} border-foreground/10 bg-white text-foreground focus:border-primary/60`}
                      >
                        <option value="09:00 AM" className="bg-white text-foreground">09:00 AM (EST)</option>
                        <option value="11:00 AM" className="bg-white text-foreground">11:00 AM (EST)</option>
                        <option value="02:00 PM" className="bg-white text-foreground">02:00 PM (EST)</option>
                        <option value="04:00 PM" className="bg-white text-foreground">04:00 PM (EST)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="block font-sans text-xs font-bold text-foreground">
                      Specific Questions or Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="What topics would you like to cover?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`${inputBaseClass} border-foreground/10 resize-none focus:border-primary/60`}
                    />
                  </div>

                  {sendError && (
                    <span className="flex items-center gap-1 text-xs text-red-600">
                      <AlertCircle className="size-3.5 shrink-0" />
                      {sendError}
                    </span>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="disabled:opacity-70 disabled:cursor-wait mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-bold text-white transition-all hover:bg-[#0f57d8] hover:shadow-[0_14px_30px_-12px_rgba(22,103,242,0.7)] cursor-pointer"
                  >
                    {sending ? <><Loader2 className="size-4 animate-spin" /> Sending...</> : <>Confirm & Reserve Call Slot <Calendar className="size-4" /></>}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}

        {/* SERVICE DETAIL MODAL */}
        {activeModal === 'service-detail' && selectedService && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-foreground/10 bg-white p-6 shadow-[0_40px_90px_-30px_rgba(11,26,51,0.45)] md:p-8"
          >
            <button
              onClick={closeModal}
              className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-full bg-primary/[0.05] text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground cursor-pointer"
              aria-label="Close modal"
            >
              <X className="size-5" />
            </button>

            <div className="mb-6">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                Service Overview • {selectedService.num}
              </span>
              <h2 className="mt-1 font-sans text-2xl font-extrabold text-foreground md:text-3xl">
                {selectedService.title}
              </h2>
              <p className="mt-2 text-base font-medium text-primary">
                {selectedService.hook}
              </p>
              <p className="mt-3 leading-relaxed text-muted-foreground text-sm md:text-base">
                {selectedService.overview}
              </p>
            </div>

            <div className="space-y-6 border-t border-foreground/10 pt-6">
              {/* Features */}
              <div>
                <h4 className="font-sans text-xs font-bold text-foreground uppercase tracking-wider text-muted-foreground mb-3">
                  Core Capabilities
                </h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  {selectedService.features.map((feat, i) => (
                    <div key={i} className="rounded-xl border border-foreground/10 bg-primary/[0.05] p-3.5 text-xs font-medium leading-relaxed text-foreground/90">
                      {feat}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="font-sans text-xs font-bold text-foreground uppercase tracking-wider text-muted-foreground mb-3">
                  Recommended Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedService.techStack.map((tech) => (
                    <span key={tech} className="rounded-lg border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Deliverables */}
              <div>
                <h4 className="font-sans text-xs font-bold text-foreground uppercase tracking-wider text-muted-foreground mb-3">
                  Deliverables
                </h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  {selectedService.deliverables.map((del, i) => (
                    <div key={i} className="rounded-xl border border-foreground/10 bg-primary/[0.05] px-4 py-3 text-xs font-semibold text-foreground">
                      {del}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end border-t border-foreground/10 pt-6">
              <button
                onClick={() => openStrategyCall()}
                className="rounded-full border border-foreground/10 bg-primary/[0.05] px-6 py-3 text-xs font-bold text-foreground transition-colors hover:bg-primary/10 cursor-pointer"
              >
                Book Strategy Call
              </button>
              <button
                onClick={() => openStartProject(selectedService.title)}
                className="rounded-full bg-primary px-7 py-3 text-xs font-extrabold text-white transition-all hover:bg-[#0f57d8] hover:shadow-[0_14px_30px_-12px_rgba(22,103,242,0.7)] cursor-pointer"
              >
                Start a Project with this Service
              </button>
            </div>
          </motion.div>
        )}

        {/* INDUSTRY DETAIL MODAL */}
        {activeModal === 'industry-detail' && selectedIndustry && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-foreground/10 bg-white p-6 shadow-[0_40px_90px_-30px_rgba(11,26,51,0.45)] md:p-8"
          >
            <button
              onClick={closeModal}
              className="absolute right-5 top-5 z-20 flex size-9 items-center justify-center rounded-full bg-[#0b1a33]/30 text-muted-foreground backdrop-blur-md transition-colors hover:bg-[#0b1a33]/45 hover:text-foreground cursor-pointer"
              aria-label="Close modal"
            >
              <X className="size-5" />
            </button>

            <div className="relative mb-6 h-48 w-full overflow-hidden rounded-xl border border-foreground/10">
              <img
                src={selectedIndustry.image}
                alt={selectedIndustry.alt}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                  Industry Focus
                </span>
                <h2 className="font-sans text-3xl font-extrabold text-foreground">
                  {selectedIndustry.title}
                </h2>
              </div>
            </div>

            <p className="leading-relaxed text-muted-foreground text-sm md:text-base">
              {selectedIndustry.overview}
            </p>

            <div className="mt-6 space-y-6 border-t border-foreground/10 pt-6">
              {/* Use Cases */}
              <div>
                <h4 className="font-sans text-xs font-bold text-foreground uppercase tracking-wider text-muted-foreground mb-3">
                  Tailored Use Cases
                </h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  {selectedIndustry.useCases.map((uc, i) => (
                    <div key={i} className="rounded-xl border border-foreground/10 bg-primary/[0.05] p-3.5 text-xs font-medium leading-relaxed text-foreground/90">
                      {uc}
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Benefits */}
              <div>
                <h4 className="font-sans text-xs font-bold text-foreground uppercase tracking-wider text-muted-foreground mb-3">
                  Business Impact
                </h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  {selectedIndustry.keyBenefits.map((ben, i) => (
                    <div key={i} className="rounded-xl border border-foreground/10 bg-primary/[0.05] px-4 py-3 text-xs font-semibold text-foreground">
                      {ben}
                    </div>
                  ))}
                </div>
              </div>

              {/* Compliance & Security */}
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-xs leading-relaxed text-muted-foreground">
                <strong className="block font-semibold text-foreground mb-1">Security & Compliance</strong>
                <span>{selectedIndustry.complianceNote}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end border-t border-foreground/10 pt-6">
              <button
                onClick={() => openStrategyCall()}
                className="rounded-full bg-primary px-7 py-3 text-xs font-extrabold text-white transition-all hover:bg-[#0f57d8] hover:shadow-[0_14px_30px_-12px_rgba(22,103,242,0.7)] cursor-pointer"
              >
                Schedule {selectedIndustry.title} Strategy Call
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  )
}
