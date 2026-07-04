import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ParticleCanvas() {
  const wrapRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const canvas = document.createElement('canvas')
    wrap.appendChild(canvas)

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, 1, 1, 1000)
    camera.position.z = 220
    const count = 720
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - .5) * 520
      positions[i * 3 + 1] = (Math.random() - .5) * 300
      positions[i * 3 + 2] = (Math.random() - .5) * 500
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const mat = new THREE.PointsMaterial({ color: 0xff6b1a, size: 1.35, transparent: true, opacity: .72, blending: THREE.AdditiveBlending })
    const pts = new THREE.Points(geo, mat)
    scene.add(pts)

    const resize = () => {
      const w = document.documentElement.clientWidth
      const h = document.documentElement.clientHeight
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', resize)
    resize()

    let t = 0, raf
    const animate = () => {
      t += .003
      pts.rotation.y += .0008
      pts.rotation.x = Math.sin(t) * .06
      mat.opacity = .48 + Math.sin(t * 4) * .18
      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      renderer.dispose()
      canvas.remove()
    }
  }, [])

  return <div ref={wrapRef} className="fixed inset-0 z-0 pointer-events-none opacity-40 overflow-hidden" />
}
