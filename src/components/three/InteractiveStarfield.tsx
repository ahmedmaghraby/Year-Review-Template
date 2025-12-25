import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export const InteractiveStarfield: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const starGroupRef = useRef<THREE.Group | null>(null)

  useEffect(() => {
    if (!containerRef.current) {
      console.warn('InteractiveStarfield: Container ref not found')
      return
    }

    console.log('InteractiveStarfield: Initializing with beautiful stars...')

    try {
      // Scene setup
      const scene = new THREE.Scene()
      sceneRef.current = scene

      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 30

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      // Dark background that shows stars beautifully
      renderer.setClearColor(0x000000, 1.0)

      const canvas = renderer.domElement as HTMLCanvasElement
      canvas.style.position = 'absolute'
      canvas.style.top = '0'
      canvas.style.left = '0'
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      canvas.style.display = 'block'

      containerRef.current.appendChild(canvas)
      console.log('InteractiveStarfield: Canvas appended to DOM')

      // Create a group for all stars (for easier interaction)
      const starGroup = new THREE.Group()
      starGroupRef.current = starGroup
      scene.add(starGroup)

      // Create individual stars with better visuals
      const starCount = 300
      const starGeometry = new THREE.IcosahedronGeometry(0.3, 2)

      // Create stars with different colors and sizes
      for (let i = 0; i < starCount; i++) {
        // Random position across entire scene
        const x = (Math.random() - 0.5) * 200
        const y = (Math.random() - 0.5) * 200
        const z = (Math.random() - 0.5) * 100

        // Color variations (white, blue, sky blue)
        const colorType = Math.random()
        let color: THREE.Color
        if (colorType > 0.8) {
          color = new THREE.Color(0.3, 0.88, 1.0) // Sky blue
        } else if (colorType > 0.6) {
          color = new THREE.Color(0.0, 0.5, 1.0) // Bright blue
        } else {
          color = new THREE.Color(1.0, 1.0, 1.0) // White
        }

        // Create material with emissive glow
        const material = new THREE.MeshStandardMaterial({
          color: color,
          emissive: color,
          emissiveIntensity: 0.8,
          metalness: 0.3,
          roughness: 0.4,
        })

        const star = new THREE.Mesh(starGeometry, material)
        star.position.set(x, y, z)

        // Random size variation
        const scale = Math.random() * 0.8 + 0.4
        star.scale.set(scale, scale, scale)

        // Store twinkle speed as custom property
        ;(star as any).twinkleSpeed = Math.random() * 0.05 + 0.02
        ;(star as any).originalIntensity = 0.8 + Math.random() * 0.3

        starGroup.add(star)
      }

      console.log('InteractiveStarfield: Created', starCount, 'beautiful glowing stars')

      // Add lighting for star glow
      const light = new THREE.PointLight(0xffffff, 0.5, 500)
      light.position.set(50, 50, 50)
      scene.add(light)

      const ambientLight = new THREE.AmbientLight(0x4488ff, 0.3)
      scene.add(ambientLight)

      // Mouse tracking for STRONG parallax
      const handleMouseMove = (event: MouseEvent) => {
        mouseRef.current.x = (event.clientX / window.innerWidth - 0.5) * 2
        mouseRef.current.y = -(event.clientY / window.innerHeight - 0.5) * 2
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
      let animationFrame: number
      let time = 0

      const animate = () => {
        animationFrame = requestAnimationFrame(animate)
        time += 0.016 // Approximately 60fps

        // Apply strong interactive parallax to all stars
        if (starGroup) {
          starGroup.rotation.x = mouseRef.current.y * 0.5 // STRONG parallax
          starGroup.rotation.y = mouseRef.current.x * 0.5 // STRONG parallax

          // Slow continuous rotation
          starGroup.rotation.z += 0.0001
        }

        // Animate each star's emissive intensity for twinkling
        starGroup.children.forEach((star: THREE.Object3D) => {
          const mesh = star as THREE.Mesh & { twinkleSpeed?: number; originalIntensity?: number }
          if (mesh.material instanceof THREE.MeshStandardMaterial) {
            const twinkleSpeed = mesh.twinkleSpeed || 0.03
            const originalIntensity = mesh.originalIntensity || 0.8
            // Beautiful twinkling effect
            mesh.material.emissiveIntensity =
              originalIntensity + Math.sin(time * twinkleSpeed) * 0.4
          }
        })

        renderer.render(scene, camera)
      }

      console.log('InteractiveStarfield: Starting animation loop with interactive parallax')
      animate()

      // Cleanup
      return () => {
        console.log('InteractiveStarfield: Cleanup')
        cancelAnimationFrame(animationFrame)
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('resize', handleResize)
        if (containerRef.current?.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement)
        }
        // Dispose all star materials and geometry
        starGroup.children.forEach((star: THREE.Object3D) => {
          const mesh = star as THREE.Mesh
          if (mesh.geometry) mesh.geometry.dispose()
          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((m) => m.dispose())
            } else {
              mesh.material.dispose()
            }
          }
        })
        renderer.dispose()
      }
    } catch (error) {
      console.error('InteractiveStarfield: Error during initialization', error)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  )
}
