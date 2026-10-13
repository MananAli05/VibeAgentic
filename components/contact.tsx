'use client'

import { useState } from 'react'
import { Check, AlertCircle, RotateCcw, Loader2 } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { sendForm, CONTACT_EMAIL } from '@/lib/send-form'
import * as React from 'react'

const inputBaseClass =
  'rounded-xl border bg-primary/[0.05] px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground/40 transition-all duration-300 focus:bg-white focus:outline-none w-full'

export function Contact() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  })

  const validateName = (name: string): string => {
    const trimmed = name.trim()
    if (!trimmed) {
      return 'Name is required'
    }
    if (trimmed.length < 2) {
      return 'Name must be at least 2 characters long'
    }
    const nameRegex = /^[a-zA-Z\s'-]{2,50}$/
    if (!nameRegex.test(trimmed)) {
      return 'Please enter a valid name (letters, spaces, hyphens only)'
    }
    return ''
  }

  const validateEmail = (email: string): string => {
    const trimmed = email.trim()
    if (!trimmed) {
      return 'Email is required'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmed)) {
      return 'Please enter a valid email address (e.g. name@company.com)'
    }
    return ''
  }

  const validateMessage = (message: string): string => {
    const trimmed = message.trim()
    if (!trimmed) {
      return 'Message is required'
    }
    if (trimmed.length < 10) {
      return 'Message must be at least 10 characters long'
    }
    return ''
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setFormData((prev) => ({ ...prev, name: val }))
    if (touched.name) {
      setErrors((prev) => ({ ...prev, name: validateName(val) }))
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setFormData((prev) => ({ ...prev, email: val }))
    if (touched.email) {
      setErrors((prev) => ({ ...prev, email: validateEmail(val) }))
    }
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    setFormData((prev) => ({ ...prev, message: val }))
    if (touched.message) {
      setErrors((prev) => ({ ...prev, message: validateMessage(val) }))
    }
  }

  const handleBlur = (field: 'name' | 'email' | 'message') => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    if (field === 'name') {
      setErrors((prev) => ({ ...prev, name: validateName(formData.name) }))
    } else if (field === 'email') {
      setErrors((prev) => ({ ...prev, email: validateEmail(formData.email) }))
    } else if (field === 'message') {
      setErrors((prev) => ({ ...prev, message: validateMessage(formData.message) }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const nameErr = validateName(formData.name)
    const emailErr = validateEmail(formData.email)
    const messageErr = validateMessage(formData.message)

    setTouched({ name: true, email: true, message: true })
    setErrors({ name: nameErr, email: emailErr, message: messageErr })

    if (nameErr || emailErr || messageErr) {
      return
    }

    setSending(true)
    setSendError('')
    try {
      await sendForm('New contact request — VibeAgentic website', {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      })
      setSent(true)
    } catch {
      setSendError(`Something went wrong. Please try again or email us at ${CONTACT_EMAIL}.`)
    } finally {
      setSending(false)
    }
  }

  const handleReset = () => {
    setSent(false)
    setSendError('')
    setFormData({ name: '', email: '', message: '' })
    setErrors({ name: '', email: '', message: '' })
    setTouched({ name: false, email: false, message: false })
  }

  return (
    <section id="contact" className="relative section-pad overflow-hidden px-5 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="grid items-center gap-10 lg:grid-cols-[4.5fr_5.5fr] lg:gap-16">

          <div className="max-w-xl">
            <h2 className="font-sans text-5xl font-extrabold leading-[0.98] headline-tight text-foreground md:text-7xl">
              Let's build your <span className="text-[#9bb4dc]">AI system.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm md:text-base leading-relaxed text-muted-foreground">
              Tell us what you want to automate or build. We'll recommend the right AI solution for your business
            </p>
          </div>

          <div className="relative w-full max-w-[560px] lg:max-w-none justify-self-center lg:justify-self-end">
            <div
              className="pointer-events-none absolute -inset-6 -z-10 blur-2xl opacity-60 rounded-full"
              style={{
                background: 'radial-gradient(circle at center, rgba(46, 175, 255, 0.28) 0%, transparent 65%)',
              }}
            />

            <div className="card-soft rounded-[2rem] p-6 md:p-8">
              {sent ? (
                <div className="flex min-h-[260px] flex-col items-center justify-center gap-4 text-center py-6">
                  <span className="flex size-14 items-center justify-center rounded-full border border-cyan-brand/30 bg-cyan-brand/10 text-cyan-brand">
                    <Check className="size-7" aria-hidden="true" />
                  </span>
                  <h3 className="font-sans text-2xl font-extrabold headline-tight text-foreground">
                    Request Received!
                  </h3>
                  <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                    Thanks for reaching out. We'll review your details and respond with the next step.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-3 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-primary/[0.05] px-6 py-2.5 text-xs font-bold text-foreground transition-all hover:bg-primary/10 cursor-pointer"
                  >
                    <RotateCcw className="size-3.5" /> Submit Another Request
                  </button>
                </div>
              ) : (
                <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-name" className="font-sans text-xs font-bold text-foreground">
                        Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="e.g. John Doe"
                        value={formData.name}
                        onChange={handleNameChange}
                        onBlur={() => handleBlur('name')}
                        className={`${inputBaseClass} ${
                          errors.name
                            ? 'border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
                            : 'border-foreground/10 hover:border-cyan-brand/30 focus:border-cyan-brand/60 focus:ring-1 focus:ring-cyan-brand/20'
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
                      <label htmlFor="contact-email" className="font-sans text-xs font-bold text-foreground">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={handleEmailChange}
                        onBlur={() => handleBlur('email')}
                        className={`${inputBaseClass} ${
                          errors.email
                            ? 'border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
                            : 'border-foreground/10 hover:border-cyan-brand/30 focus:border-cyan-brand/60 focus:ring-1 focus:ring-cyan-brand/20'
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
                    <label htmlFor="contact-message" className="font-sans text-xs font-bold text-foreground">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={3}
                      placeholder="Tell us what you want to automate or build (at least 10 characters)..."
                      value={formData.message}
                      onChange={handleMessageChange}
                      onBlur={() => handleBlur('message')}
                      className={`${inputBaseClass} resize-none leading-relaxed ${
                        errors.message
                          ? 'border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
                          : 'border-foreground/10 hover:border-cyan-brand/30 focus:border-cyan-brand/60 focus:ring-1 focus:ring-cyan-brand/20'
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
                    className="disabled:opacity-70 disabled:cursor-wait w-full py-3.5 px-6 rounded-full font-extrabold text-sm text-white bg-primary transition-all duration-300 shadow-[0_14px_30px_-12px_rgba(22,103,242,0.7)] hover:bg-gradient-to-r hover:from-primary hover:to-sky-brand hover:shadow-[0_18px_36px_-12px_rgba(22,103,242,0.8)] hover:-translate-y-[2px] active:translate-y-0 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {sending ? (
                      <>
                        <Loader2 className="size-4 animate-spin" /> Sending...
                      </>
                    ) : (
                      'Submit Request'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}