'use client'

import { useState, useEffect } from 'react'
import { SmoothScroll } from '@/components/smooth-scroll'
import { SiteNav } from '@/components/site-nav'
import { Hero, TechStack } from '@/components/hero'
import { About } from '@/components/about'
import { Process } from '@/components/process'
import { Services } from '@/components/services'
import { Industries } from '@/components/industries'
import { WhereToStart, WhyTryAzog, ClientStories, NextSteps } from '@/components/trust'
import { Team } from '@/components/team'
import { Faq } from '@/components/faq'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { PrivacyPolicy } from '@/components/privacy-policy'
import { TermsConditions } from '@/components/terms-conditions'
import { ModalProvider } from '@/lib/modal-context'
import { ModalManager } from '@/components/modals'
import * as React from 'react'

export default function App() {
  const [currentPath, setCurrentPath] = useState('/')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname)
    }

    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  return (
    <ModalProvider>
      <SmoothScroll>
        <SiteNav />
        <main className="relative z-10">
          {currentPath === '/privacy-policy' ? (
            <PrivacyPolicy />
          ) : currentPath === '/terms-conditions' ? (
            <TermsConditions />
          ) : (
            <>
              <Hero />
              <About />
              <TechStack />
              <Services />
              <WhereToStart />
              <Process />
              <WhyTryAzog />
              <Industries />
              <ClientStories />
              {/* Testimonials are hidden until real, verifiable client quotes are available (website test report TC-07). */}
              <Team />
              <Faq />
              <NextSteps />
              <Contact />
            </>
          )}
        </main>
        <Footer />
        <ModalManager />
      </SmoothScroll>
    </ModalProvider>
  )
}
