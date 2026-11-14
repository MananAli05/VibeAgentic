import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './app/globals.css'

const container = document.getElementById('root')!
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Production builds ship pre-rendered HTML (scripts/prerender.mjs), which React hydrates;
// the dev server serves an empty root, which React renders from scratch.
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, app)
} else {
  ReactDOM.createRoot(container).render(app)
}
