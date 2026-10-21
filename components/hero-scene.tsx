'use client'

import { useEffect, useRef } from 'react'
import type { Mesh } from 'three'

/**
 * Three.js accents for the hero: a few glossy brand-blue shapes floating in the empty space
 * either side of the headline (a ring echoing the logo, a faceted "AI crystal" and two small
 * spheres). They bob, turn slowly, lean towards the cursor and drift up as the page scrolls.
 * Only mounted on wide screens where the flanks are empty; Three.js is loaded lazily, rendering
 * pauses off-screen / in background tabs, and reduced-motion users get a single static frame.
 */
export function HeroScene({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    if (!window.matchMedia('(min-width: 1100px)').matches) return
    let disposed = false
    let cleanup = () => {}

    Promise.all([import('three'), import('three/examples/jsm/environments/RoomEnvironment.js')]).then(
      ([THREE, { RoomEnvironment }]) => {
        if (disposed) return
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setClearColor(0x000000, 0)
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.05
        renderer.domElement.style.width = '100%'
        renderer.domElement.style.height = '100%'
        renderer.domElement.style.display = 'block'
        host.appendChild(renderer.domElement)

        const scene = new THREE.Scene()
        const pmrem = new THREE.PMREMGenerator(renderer)
        const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
        scene.environment = envTexture

        const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
        camera.position.set(0, 0, 12)

        // Soft key light from the top-left plus a sky-blue rim from behind
        scene.add(new THREE.HemisphereLight(0xffffff, 0xcfe3ff, 0.9))
        const key = new THREE.DirectionalLight(0xffffff, 1.4)
        key.position.set(-4, 6, 8)
        scene.add(key)
        const rim = new THREE.PointLight(0x38c6ff, 30, 30)
        rim.position.set(0, -2, -4)
        scene.add(rim)

        const glossy = (color: string, opts: Record<string, unknown> = {}) =>
          new THREE.MeshPhysicalMaterial({
            color,
            roughness: 0.18,
            metalness: 0.05,
            clearcoat: 1,
            clearcoatRoughness: 0.08,
            ...opts,
          })

        const root = new THREE.Group()
        scene.add(root)

        type Item = { mesh: Mesh; side: -1 | 1; inset: number; y: number; z: number; float: number; phase: number; spin: [number, number] }
        const items: Item[] = []
        const add = (mesh: Mesh, item: Omit<Item, 'mesh'>) => {
          root.add(mesh)
          items.push({ mesh, ...item })
        }

        // Ring (logo echo), upper left
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.56, 0.18, 48, 128), glossy('#1667f2'))
        ring.rotation.set(0.9, -0.5, 0.2)
        add(ring, { side: -1, inset: 1.35, y: 1.25, z: 0, float: 0.16, phase: 0, spin: [0.18, 0.28] })

        // Faceted crystal, right of the headline
        const crystal = new THREE.Mesh(
          new THREE.IcosahedronGeometry(0.72, 0),
          glossy('#4fa8ff', { flatShading: true, roughness: 0.12, iridescence: 0.5, iridescenceIOR: 1.3 })
        )
        add(crystal, { side: 1, inset: 1.35, y: -0.35, z: 0, float: 0.2, phase: 1.7, spin: [0.22, 0.16] })

        // Small accent spheres
        const sphereGeo = new THREE.SphereGeometry(1, 48, 48)
        const dotA = new THREE.Mesh(sphereGeo, glossy('#38c6ff'))
        dotA.scale.setScalar(0.2)
        add(dotA, { side: -1, inset: 2.5, y: -2.25, z: 0.5, float: 0.12, phase: 2.6, spin: [0, 0] })
        const dotB = new THREE.Mesh(sphereGeo, glossy('#ffffff', { roughness: 0.25 }))
        dotB.scale.setScalar(0.17)
        add(dotB, { side: 1, inset: 2.4, y: 2.45, z: -0.5, float: 0.1, phase: 4.1, spin: [0, 0] })

        // Place shapes relative to the visible edges so they stay in the empty flanks
        const layout = () => {
          const w = host.clientWidth
          const h = host.clientHeight
          if (!w || !h) return
          renderer.setSize(w, h, false)
          camera.aspect = w / h
          camera.updateProjectionMatrix()
          const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z
          const halfW = halfH * camera.aspect
          const s = Math.min(1, w / 1440)
          root.scale.setScalar(s)
          items.forEach((it) => {
            it.mesh.userData.baseX = (it.side * (halfW - it.inset * s)) / s
          })
        }
        layout()
        const ro = new ResizeObserver(layout)
        ro.observe(host)

        const pointer = { x: 0, y: 0 }
        const onPointer = (e: PointerEvent) => {
          pointer.x = (e.clientX / window.innerWidth) * 2 - 1
          pointer.y = (e.clientY / window.innerHeight) * 2 - 1
        }
        window.addEventListener('pointermove', onPointer, { passive: true })

        let visible = true
        const io = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting
          if (visible) loop()
        })
        io.observe(host)

        const clock = new THREE.Clock()
        let t = 0
        let raf = 0
        const lean = { x: 0, y: 0 }

        const step = (dt: number) => {
          t += dt
          lean.x += (pointer.x - lean.x) * 0.04
          lean.y += (pointer.y - lean.y) * 0.04
          const scroll = Math.min(window.scrollY / 600, 1)
          items.forEach((it, i) => {
            const depth = 1 + i * 0.15
            it.mesh.position.set(
              it.mesh.userData.baseX + lean.x * 0.25 * depth,
              it.y + Math.sin(t * 0.8 + it.phase) * it.float - lean.y * 0.18 * depth + scroll * 1.6 * depth,
              it.z
            )
            it.mesh.rotation.x += it.spin[0] * dt
            it.mesh.rotation.y += it.spin[1] * dt
          })
          renderer.domElement.style.opacity = String(1 - scroll)
        }

        const loop = () => {
          cancelAnimationFrame(raf)
          if (disposed || !visible || document.hidden) return
          step(Math.min(clock.getDelta(), 0.05))
          renderer.render(scene, camera)
          raf = requestAnimationFrame(loop)
        }

        const onVisibility = () => {
          clock.getDelta()
          if (!document.hidden) loop()
        }
        document.addEventListener('visibilitychange', onVisibility)

        if (reduced) {
          step(0)
          renderer.render(scene, camera)
        } else {
          loop()
        }

        cleanup = () => {
          cancelAnimationFrame(raf)
          ro.disconnect()
          io.disconnect()
          window.removeEventListener('pointermove', onPointer)
          document.removeEventListener('visibilitychange', onVisibility)
          items.forEach(({ mesh }) => {
            mesh.geometry.dispose()
            ;(mesh.material as { dispose: () => void }).dispose()
          })
          envTexture.dispose()
          pmrem.dispose()
          renderer.dispose()
          renderer.domElement.remove()
        }
      }
    )

    return () => {
      disposed = true
      cleanup()
    }
  }, [])

  return <div ref={hostRef} aria-hidden="true" className={className} />
}
