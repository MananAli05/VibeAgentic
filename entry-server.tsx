// Build-time render of the home page so search engines and AI crawlers get real HTML
// (see scripts/prerender.mjs). The browser then hydrates this markup in main.tsx.
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

export function render() {
  return renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
