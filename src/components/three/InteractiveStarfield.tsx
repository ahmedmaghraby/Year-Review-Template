import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export const InteractiveStarfield: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    // ============ SCENE SETUP ============
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    )
    camera.position.z = 100

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000510, 1)

    const canvas = renderer.domElement
    canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;display:block'
    containerRef.current.appendChild(canvas)

    // ============ CREATE STAR SPRITE TEXTURE ============
    const createStarTexture = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 64
      canvas.height = 64
      const ctx = canvas.getContext('2d')!
      
      // Create star with soft glow
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
      gradient.addColorStop(0.1, 'rgba(255, 255, 255, 0.8)')
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.4)')
      gradient.addColorStop(0.6, 'rgba(200, 220, 255, 0.1)')
      gradient.addColorStop(1, 'rgba(100, 150, 255, 0)')
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 64, 64)
      
      return new THREE.CanvasTexture(canvas)
    }

    const starTexture = createStarTexture()

    // ============ STARS - INSTANCED POINTS ============
    const starCount = 1200
    const starGeometry = new THREE.BufferGeometry()
    const starPositions = new Float32Array(starCount * 3)
    const starColors = new Float32Array(starCount * 3)
    const starSizes = new Float32Array(starCount)
    const starPhases = new Float32Array(starCount)
    const starSpeeds = new Float32Array(starCount)

    for (let i = 0; i < starCount; i++) {
      // Distribute stars in 3D space with depth variation
      const radius = Math.random() * 500 + 100
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      
      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      starPositions[i * 3 + 2] = radius * Math.cos(phi) - 200

      // Star colors - mostly white/blue with occasional warm tints
      const colorRandom = Math.random()
      if (colorRandom > 0.95) {
        // Warm orange/red stars
        starColors[i * 3] = 1.0
        starColors[i * 3 + 1] = 0.7 + Math.random() * 0.2
        starColors[i * 3 + 2] = 0.4 + Math.random() * 0.2
      } else if (colorRandom > 0.85) {
        // Blue-white stars
        starColors[i * 3] = 0.7 + Math.random() * 0.3
        starColors[i * 3 + 1] = 0.85 + Math.random() * 0.15
        starColors[i * 3 + 2] = 1.0
      } else {
        // Pure white stars
        const brightness = 0.9 + Math.random() * 0.1
        starColors[i * 3] = brightness
        starColors[i * 3 + 1] = brightness
        starColors[i * 3 + 2] = brightness
      }

      // Variable star sizes for depth
      starSizes[i] = Math.random() * 2.5 + 0.5
      
      // Twinkling animation parameters
      starPhases[i] = Math.random() * Math.PI * 2
      starSpeeds[i] = 0.5 + Math.random() * 1.5
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3))
    starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1))

    const starMaterial = new THREE.PointsMaterial({
      size: 3,
      map: starTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    })

    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)

    // ============ PLANETS - ALL 9 PLANETS ============
    const createPlanetTexture = (planetType: string) => {
      const canvas = document.createElement('canvas')
      canvas.width = 512
      canvas.height = 512
      const ctx = canvas.getContext('2d')!
      
      // Create realistic planet textures based on actual solar system planets
      switch(planetType) {
        case 'mercury':
          // Gray rocky surface
          ctx.fillStyle = '#8c7853'
          ctx.fillRect(0, 0, 512, 512)
          for (let i = 0; i < 3000; i++) {
            ctx.fillStyle = `rgba(${100 + Math.random() * 50}, ${90 + Math.random() * 40}, ${70 + Math.random() * 30}, 0.4)`
            ctx.beginPath()
            ctx.arc(Math.random() * 512, Math.random() * 512, Math.random() * 3, 0, Math.PI * 2)
            ctx.fill()
          }
          break
          
        case 'venus':
          // Yellowish with cloud patterns
          const venusGradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256)
          venusGradient.addColorStop(0, '#ffd89d')
          venusGradient.addColorStop(0.6, '#e6c485')
          venusGradient.addColorStop(1, '#c9a86a')
          ctx.fillStyle = venusGradient
          ctx.fillRect(0, 0, 512, 512)
          // Cloud swirls
          for (let y = 0; y < 512; y += 30) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 + Math.random() * 0.1})`
            ctx.lineWidth = 20
            ctx.beginPath()
            ctx.moveTo(0, y)
            ctx.quadraticCurveTo(256, y + Math.sin(y) * 20, 512, y)
            ctx.stroke()
          }
          break
          
        case 'earth':
          // Blue with green continents
          ctx.fillStyle = '#1a5f9f'
          ctx.fillRect(0, 0, 512, 512)
          // Continents
          ctx.fillStyle = '#3d8f3d'
          for (let i = 0; i < 12; i++) {
            ctx.beginPath()
            ctx.ellipse(Math.random() * 512, Math.random() * 512, 40 + Math.random() * 60, 30 + Math.random() * 40, Math.random() * Math.PI * 2, 0, Math.PI * 2)
            ctx.fill()
          }
          // White clouds
          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
          for (let i = 0; i < 50; i++) {
            ctx.beginPath()
            ctx.arc(Math.random() * 512, Math.random() * 512, Math.random() * 20 + 5, 0, Math.PI * 2)
            ctx.fill()
          }
          break
          
        case 'mars':
          // Red-orange desert
          ctx.fillStyle = '#cd5c5c'
          ctx.fillRect(0, 0, 512, 512)
          // Dark regions
          ctx.fillStyle = '#8b4513'
          for (let i = 0; i < 20; i++) {
            ctx.beginPath()
            ctx.arc(Math.random() * 512, Math.random() * 512, Math.random() * 40 + 10, 0, Math.PI * 2)
            ctx.fill()
          }
          // Polar ice cap
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
          ctx.beginPath()
          ctx.arc(256, 50, 40, 0, Math.PI * 2)
          ctx.fill()
          break
          
        case 'jupiter':
          // Brown and orange bands
          for (let y = 0; y < 512; y++) {
            const t = y / 512
            const band = Math.sin(t * 15 + Math.random() * 0.5) * 0.5 + 0.5
            const r = Math.floor(180 + band * 75)
            const g = Math.floor(120 + band * 60)
            const b = Math.floor(80 + band * 40)
            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
            ctx.fillRect(0, y, 512, 1)
          }
          // Great Red Spot
          ctx.fillStyle = 'rgba(200, 100, 80, 0.8)'
          ctx.beginPath()
          ctx.ellipse(350, 300, 60, 40, 0, 0, Math.PI * 2)
          ctx.fill()
          break
          
        case 'saturn':
          // Pale yellow with subtle bands
          for (let y = 0; y < 512; y++) {
            const t = y / 512
            const band = Math.sin(t * 12) * 0.3 + 0.7
            const r = Math.floor(230 * band)
            const g = Math.floor(220 * band)
            const b = Math.floor(180 * band)
            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
            ctx.fillRect(0, y, 512, 1)
          }
          break
          
        case 'uranus':
          // Cyan-blue
          const uranusGradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256)
          uranusGradient.addColorStop(0, '#7dd3e8')
          uranusGradient.addColorStop(0.7, '#5fb8cc')
          uranusGradient.addColorStop(1, '#4a9fb3')
          ctx.fillStyle = uranusGradient
          ctx.fillRect(0, 0, 512, 512)
          break
          
        case 'neptune':
          // Deep blue
          const neptuneGradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256)
          neptuneGradient.addColorStop(0, '#4f6bcc')
          neptuneGradient.addColorStop(0.6, '#3f5bb8')
          neptuneGradient.addColorStop(1, '#2d4a9e')
          ctx.fillStyle = neptuneGradient
          ctx.fillRect(0, 0, 512, 512)
          // Dark spot
          ctx.fillStyle = 'rgba(30, 40, 80, 0.5)'
          ctx.beginPath()
          ctx.ellipse(300, 250, 50, 35, 0, 0, Math.PI * 2)
          ctx.fill()
          break
          
        case 'pluto':
          // Tan and dark brown
          ctx.fillStyle = '#a67c52'
          ctx.fillRect(0, 0, 512, 512)
          // Heart-shaped region
          ctx.fillStyle = '#d4a574'
          ctx.beginPath()
          ctx.arc(220, 256, 60, 0, Math.PI * 2)
          ctx.arc(292, 256, 60, 0, Math.PI * 2)
          ctx.fill()
          break
      }
      
      return new THREE.CanvasTexture(canvas)
    }

    const planetsGroup = new THREE.Group()
    
    const planetData = [
      { type: 'mercury', size: 3, orbitRadius: 60, orbitSpeed: 0.0008, rotationSpeed: 0.001, emissive: 0x3a3a3a, z: -120, startAngle: 0, yOffset: 40 },
      { type: 'venus', size: 5, orbitRadius: 80, orbitSpeed: 0.0006, rotationSpeed: 0.0005, emissive: 0x4a3a1a, z: -140, startAngle: 0.7, yOffset: -30 },
      { type: 'earth', size: 5.5, orbitRadius: 100, orbitSpeed: 0.0005, rotationSpeed: 0.001, emissive: 0x0a2a4a, z: -160, startAngle: 1.4, yOffset: 60 },
      { type: 'mars', size: 4, orbitRadius: 120, orbitSpeed: 0.0004, rotationSpeed: 0.0009, emissive: 0x3a1a1a, z: -180, startAngle: 2.1, yOffset: -50 },
      { type: 'jupiter', size: 14, orbitRadius: 160, orbitSpeed: 0.0002, rotationSpeed: 0.0015, emissive: 0x2a1a0a, z: -220, startAngle: 2.8, yOffset: 20 },
      { type: 'saturn', size: 12, orbitRadius: 190, orbitSpeed: 0.00015, rotationSpeed: 0.0012, emissive: 0x2a2a1a, z: -250, startAngle: 3.5, yOffset: -70 },
      { type: 'uranus', size: 8, orbitRadius: 220, orbitSpeed: 0.00012, rotationSpeed: 0.0008, emissive: 0x1a2a3a, z: -280, startAngle: 4.2, yOffset: 80 },
      { type: 'neptune', size: 8, orbitRadius: 250, orbitSpeed: 0.0001, rotationSpeed: 0.0007, emissive: 0x0a1a2a, z: -310, startAngle: 4.9, yOffset: -40 },
      { type: 'pluto', size: 2.5, orbitRadius: 280, orbitSpeed: 0.00008, rotationSpeed: 0.0004, emissive: 0x2a2a2a, z: -340, startAngle: 5.6, yOffset: 50 }
    ]

    planetData.forEach((data) => {
      const texture = createPlanetTexture(data.type)
      const planet = new THREE.Mesh(
        new THREE.SphereGeometry(data.size, 64, 64),
        new THREE.MeshStandardMaterial({
          map: texture,
          emissive: data.emissive,
          emissiveIntensity: 0.2,
          metalness: 0.1,
          roughness: 0.8
        })
      )
      
      planet.position.set(
        Math.cos(data.startAngle) * data.orbitRadius,
        data.yOffset,
        Math.sin(data.startAngle) * data.orbitRadius * 0.5 + data.z
      )
      
      planet.userData = {
        orbitRadius: data.orbitRadius,
        orbitSpeed: data.orbitSpeed,
        rotationSpeed: data.rotationSpeed,
        orbitAngle: data.startAngle,
        depth: data.z,
        yOffset: data.yOffset,
        name: data.type
      }
      
      // Add Saturn's rings
      if (data.type === 'saturn') {
        const ringGeometry = new THREE.RingGeometry(data.size * 1.5, data.size * 2.5, 64)
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: 0xc9b18a,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.6
        })
        const ring = new THREE.Mesh(ringGeometry, ringMaterial)
        ring.rotation.x = Math.PI / 2.3
        planet.add(ring)
      }
      
      planetsGroup.add(planet)
    })

    scene.add(planetsGroup)

    // ============ SHOOTING STARS ============
    const shootingStarsGroup = new THREE.Group()
    scene.add(shootingStarsGroup)

    // Create realistic shooting star texture with glow
    const createShootingStarTexture = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 256
      canvas.height = 16
      const ctx = canvas.getContext('2d')!
      
      // Create gradient tail from bright to transparent
      const gradient = ctx.createLinearGradient(0, 8, 256, 8)
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
      gradient.addColorStop(0.05, 'rgba(255, 250, 230, 0.95)')
      gradient.addColorStop(0.15, 'rgba(255, 240, 200, 0.8)')
      gradient.addColorStop(0.4, 'rgba(200, 220, 255, 0.4)')
      gradient.addColorStop(0.7, 'rgba(150, 180, 255, 0.15)')
      gradient.addColorStop(1, 'rgba(100, 150, 255, 0)')
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 256, 16)
      
      // Add bright core
      const coreGradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8)
      coreGradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
      coreGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)')
      coreGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = coreGradient
      ctx.fillRect(0, 0, 16, 16)
      
      return new THREE.CanvasTexture(canvas)
    }

    const shootingStarTexture = createShootingStarTexture()

    const createShootingStar = () => {
      // Use a plane with texture for realistic tail
      const geometry = new THREE.PlaneGeometry(30, 0.8)
      const material = new THREE.MeshBasicMaterial({
        map: shootingStarTexture,
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      })
      
      const shootingStar = new THREE.Mesh(geometry, material)
      
      // Random starting position - from edge of view
      const side = Math.floor(Math.random() * 4)
      let x, y, z
      
      if (side === 0) { // Top
        x = (Math.random() - 0.5) * 300
        y = 200
        z = -50 - Math.random() * 100
      } else if (side === 1) { // Right
        x = 250
        y = (Math.random() - 0.5) * 200
        z = -50 - Math.random() * 100
      } else if (side === 2) { // Left
        x = -250
        y = (Math.random() - 0.5) * 200
        z = -50 - Math.random() * 100
      } else { // Top-right diagonal (most common)
        x = 200 + Math.random() * 100
        y = 150 + Math.random() * 100
        z = -50 - Math.random() * 100
      }
      
      shootingStar.position.set(x, y, z)
      
      // Direction - diagonal downward motion
      const targetX = x - 150 - Math.random() * 100
      const targetY = y - 200 - Math.random() * 50
      const targetZ = z - 20 - Math.random() * 20
      
      const direction = new THREE.Vector3(targetX - x, targetY - y, targetZ - z).normalize()
      const speed = 3 + Math.random() * 2
      
      shootingStar.userData = {
        velocity: direction.multiplyScalar(speed),
        life: 1.5,
        maxLife: 1.5
      }
      
      // Orient the plane to face the camera and along direction of travel
      const angle = Math.atan2(direction.y, direction.x)
      shootingStar.rotation.z = angle
      
      shootingStarsGroup.add(shootingStar)
      return shootingStar
    }

    // Initial shooting stars
    const activeShootingStars: THREE.Mesh[] = []
    for (let i = 0; i < 1; i++) {
      activeShootingStars.push(createShootingStar())
    }

    let shootingStarTimer = 0
    const shootingStarInterval = 3.0

    // ============ NEBULA BACKGROUND ============
    const createNebulaTexture = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 1024
      canvas.height = 1024
      const ctx = canvas.getContext('2d')!

      // Multiple overlapping nebula clouds
      const colors = [
        { r: 60, g: 40, b: 120, a: 0.15 },
        { r: 80, g: 20, b: 80, a: 0.12 },
        { r: 20, g: 60, b: 100, a: 0.1 },
        { r: 100, g: 50, b: 120, a: 0.08 }
      ]
      
      colors.forEach((color) => {
        const x = 256 + Math.random() * 512
        const y = 256 + Math.random() * 512
        const radius = 300 + Math.random() * 400
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`)
        gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a * 0.5})`)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, 1024, 1024)
      })
      
      return new THREE.CanvasTexture(canvas)
    }

    const nebulaTexture = createNebulaTexture()
    const nebulaSphere = new THREE.Mesh(
      new THREE.SphereGeometry(800, 32, 32),
      new THREE.MeshBasicMaterial({
        map: nebulaTexture,
        side: THREE.BackSide,
        transparent: true,
        opacity: 0.6
      })
    )
    scene.add(nebulaSphere)

    // ============ LIGHTING ============
    const ambientLight = new THREE.AmbientLight(0x202040, 0.8)
    scene.add(ambientLight)

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.2)
    sunLight.position.set(100, 50, 200)
    scene.add(sunLight)

    const fillLight = new THREE.PointLight(0x4466ff, 0.4, 400)
    fillLight.position.set(-100, -50, 100)
    scene.add(fillLight)

    // ============ MOUSE TRACKING ============
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = -(event.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouseMove)

    // ============ RESIZE HANDLER ============
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // ============ ANIMATION LOOP ============
    let animationFrame: number
    let time = 0
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrame = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      time += delta

      // Parallax effect - stars move more slowly than planets
      const targetRotationY = mouseRef.current.x * 0.15
      const targetRotationX = mouseRef.current.y * 0.15
      
      stars.rotation.y += (targetRotationY - stars.rotation.y) * 0.05
      stars.rotation.x += (targetRotationX - stars.rotation.x) * 0.05
      
      // Planets move faster for parallax depth
      planetsGroup.rotation.y += (targetRotationY * 1.5 - planetsGroup.rotation.y) * 0.08
      planetsGroup.rotation.x += (targetRotationX * 1.5 - planetsGroup.rotation.x) * 0.08

      // Twinkling stars
      const sizes = starGeometry.attributes.size.array
      for (let i = 0; i < starCount; i++) {
        const phase = starPhases[i]
        const speed = starSpeeds[i]
        const twinkle = Math.sin(time * speed + phase) * 0.5 + 0.5
        sizes[i] = (starSizes[i] * (0.7 + twinkle * 0.6))
      }
      starGeometry.attributes.size.needsUpdate = true

      // Animate planets - rotation and orbit
      planetsGroup.children.forEach((planet) => {
        const data = planet.userData
        
        // Rotate planet on its axis
        planet.rotation.x += data.rotationSpeed * delta * 60
        planet.rotation.y += data.rotationSpeed * delta * 60 * 1.3
        
        // Orbit around center while maintaining Y offset
        data.orbitAngle += data.orbitSpeed * delta * 60
        const x = Math.cos(data.orbitAngle) * data.orbitRadius
        const z = Math.sin(data.orbitAngle) * data.orbitRadius * 0.5 + data.depth
        planet.position.x = x
        planet.position.y = data.yOffset
        planet.position.z = z
      })

      // Shooting stars
      shootingStarTimer += delta
      if (shootingStarTimer > shootingStarInterval) {
        activeShootingStars.push(createShootingStar())
        shootingStarTimer = 0
      }

      for (let i = activeShootingStars.length - 1; i >= 0; i--) {
        const star = activeShootingStars[i]
        star.position.add(star.userData.velocity.clone().multiplyScalar(delta * 60))
        star.userData.life -= delta * 0.5
        
        if (star.userData.life <= 0) {
          shootingStarsGroup.remove(star)
          star.geometry.dispose()
          if (Array.isArray(star.material)) {
            star.material.forEach(mat => mat.dispose())
          } else {
            star.material.dispose()
          }
          activeShootingStars.splice(i, 1)
        } else {
          // Fade out smoothly
          if (Array.isArray(star.material)) {
            star.material.forEach(mat => {
              if ('opacity' in mat) {
                mat.opacity = Math.pow(star.userData.life / star.userData.maxLife, 0.5)
              }
            })
          } else if ('opacity' in star.material) {
            star.material.opacity = Math.pow(star.userData.life / star.userData.maxLife, 0.5)
          }
        }
      }

      // Slow nebula rotation
      nebulaSphere.rotation.y += delta * 0.01

      renderer.render(scene, camera)
    }

    animate()

    // ============ CLEANUP ============
    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      
      if (containerRef.current?.contains(canvas)) {
        containerRef.current.removeChild(canvas)
      }
      
      // Dispose geometries and materials
      starGeometry.dispose()
      starMaterial.dispose()
      starTexture.dispose()
      
      shootingStarTexture.dispose()
      
      planetsGroup.children.forEach(planet => {
        if (planet instanceof THREE.Mesh) {
          planet.geometry.dispose()
          planet.material.map?.dispose()
          planet.material.dispose()
          // Dispose Saturn's rings if present
          if (planet.children.length > 0) {
            planet.children.forEach(child => {
              if (child instanceof THREE.Mesh) {
                child.geometry?.dispose()
                child.material?.dispose()
              }
            })
          }
        }
      })
      
      activeShootingStars.forEach(star => {
        star.geometry.dispose()
        if (Array.isArray(star.material)) {
          star.material.forEach(mat => mat.dispose())
        } else {
          star.material.dispose()
        }
      })
      
      nebulaSphere.geometry.dispose()
      nebulaSphere.material.map?.dispose()
      nebulaSphere.material.dispose()
      
      renderer.dispose()
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

export default InteractiveStarfield