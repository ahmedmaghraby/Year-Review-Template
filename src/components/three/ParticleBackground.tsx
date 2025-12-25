import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface ParticleBackgroundProps {
  particleCount?: number
  autoRotate?: boolean
}

/**
 * Three.js Particle Background with Lendo brand colors
 * Optimized for performance with instanced geometry
 */
export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  particleCount = 200,
  autoRotate = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const animationIdRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 3
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)) // Cap for performance
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create particles
    const geometry = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)
    const particleVelocities = new Float32Array(particleCount * 3)
    const particleColors = new Float32Array(particleCount * 3)

    // Lendo brand colors as RGB
    const colors = [
      [0, 0.33, 1], // Brand Blue (#0055FF)
      [0.3, 0.88, 1], // Sky Blue (#4DE1FF)
      [1, 0.71, 0.38], // Orange (#FFB460)
    ]

    for (let i = 0; i < particleCount; i++) {
      // Position
      particlePositions[i * 3] = (Math.random() - 0.5) * 8
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 8
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 8

      // Velocity
      particleVelocities[i * 3] = (Math.random() - 0.5) * 0.02
      particleVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02
      particleVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02

      // Color
      const color = colors[Math.floor(Math.random() * colors.length)]
      particleColors[i * 3] = color[0]
      particleColors[i * 3 + 1] = color[1]
      particleColors[i * 3 + 2] = color[2]
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)
    particlesRef.current = particles

    // Mouse tracking
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      const positions = geometry.attributes.position.array as Float32Array

      // Update particles
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += particleVelocities[i * 3]
        positions[i * 3 + 1] += particleVelocities[i * 3 + 1]
        positions[i * 3 + 2] += particleVelocities[i * 3 + 2]

        // Bounce off edges
        if (Math.abs(positions[i * 3]) > 4) particleVelocities[i * 3] *= -1
        if (Math.abs(positions[i * 3 + 1]) > 4) particleVelocities[i * 3 + 1] *= -1
        if (Math.abs(positions[i * 3 + 2]) > 4) particleVelocities[i * 3 + 2] *= -1
      }

      geometry.attributes.position.needsUpdate = true

      // Rotation
      if (autoRotate) {
        particles.rotation.x += 0.0001
        particles.rotation.y += 0.0002
      }

      // Mouse influence
      particles.rotation.x += mouseRef.current.y * 0.0005
      particles.rotation.y += mouseRef.current.x * 0.0005

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [particleCount, autoRotate])

  return <div ref={containerRef} className="fixed inset-0 -z-10" />
}
