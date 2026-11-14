// Injects the server-rendered home page into dist/index.html after `vite build`, so crawlers
// that do not run JavaScript (search engines, AI crawlers, link previews) still see the content.
// The browser then hydrates this markup (see main.tsx).
import { readFile, writeFile, rm } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ssrDir = path.join(root, 'dist-ssr')
const indexPath = path.join(root, 'dist', 'index.html')

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.mjs')).href)
const appHtml = render()

const template = await readFile(indexPath, 'utf8')
const placeholder = '<div id="root"></div>'
if (!template.includes(placeholder)) {
  throw new Error('prerender: <div id="root"></div> not found in dist/index.html')
}
await writeFile(indexPath, template.replace(placeholder, `<div id="root">${appHtml}</div>`))
await rm(ssrDir, { recursive: true, force: true })

console.log(`prerender: injected ${(appHtml.length / 1024).toFixed(0)} kB of HTML into dist/index.html`)
