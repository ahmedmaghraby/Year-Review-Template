import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Star {
  id: number
  x: number
  y: number
  size: number
}

/**
 * Interactive Star Collector game for the closing section
 * Tracks best score in local storage
 */
export const StarCollectorGame: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [gameActive, setGameActive] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [bestScore, setBestScore] = useState(0)
  const [stars, setStars] = useState<Star[]>([])
  const [gameOver, setGameOver] = useState(false)
  const starIdRef = useRef(0)

  // Load best score from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('starCollectorBestScore')
    if (saved) {
      setBestScore(parseInt(saved, 10))
    }
  }, [])

  // Save best score when it changes
  useEffect(() => {
    if (bestScore > 0) {
      localStorage.setItem('starCollectorBestScore', bestScore.toString())
    }
  }, [bestScore])

  // Game loop - spawn stars and manage timer
  useEffect(() => {
    if (!gameActive) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false)
          setGameOver(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameActive])

  // Spawn new stars while game is active
  useEffect(() => {
    if (!gameActive || !containerRef.current) return

    const spawnStar = () => {
      const rect = containerRef.current!.getBoundingClientRect()
      const newStar: Star = {
        id: starIdRef.current++,
        x: Math.random() * (rect.width - 60),
        y: Math.random() * (rect.height - 60),
        size: Math.random() * 20 + 25,
      }
      setStars((prev) => [...prev, newStar])
      const timeoutTime= isMobile() ? Math.random() * 1000 + 700 :Math.random() * 1500 + 700
      // Remove star after timeoutTime if not clicked
      setTimeout(() => {
        setStars((prev) => prev.filter((s) => s.id !== newStar.id))
      }, timeoutTime)
    }

    const spawnInterval = setInterval(spawnStar, 600)
    return () => clearInterval(spawnInterval)
  }, [gameActive])

  const isMobile = () => {
    return window.innerWidth <= 768
  }

  const handleStartGame = () => {
    setScore(0)
    setTimeLeft(30)
    setGameActive(true)
    setGameOver(false)
    setStars([])
    starIdRef.current = 0
  }

  const handleCollectStar = (id: number) => {
    setStars((prev) => prev.filter((s) => s.id !== id))
    const newScore = score + 1
    setScore(newScore)

    // Update best score if current score is higher
    if (newScore > bestScore) {
      setBestScore(newScore)
    }
  }

  const handlePlayAgain = () => {
    handleStartGame()
  }

  return (
    <div className="flex flex-col items-center mb-12">
      <h2 className="mb-6 text-5xl font-black tracking-tight md:text-7xl">
            <span className="text-transparent gradient-text-accent bg-clip-text">
              Time for a Break!
            </span>
          </h2>
          
          <p className="max-w-3xl mx-auto mb-8 text-xl font-light md:text-2xl text-brand-skyblue/80">
            You've scrolled this far! Reward yourself with a quick game 🚀
          </p>
    <div ref={containerRef} className="relative w-full overflow-hidden border h-80 bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-2xl border-green-500/20">
      {/* Game Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-40 h-40 rounded-full top-10 left-10 bg-green-500/20 blur-3xl" />
        <div className="absolute w-40 h-40 rounded-full bottom-10 right-10 bg-emerald-500/20 blur-3xl" />
      </div>

      {!gameActive && !gameOver && (
        <motion.div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-center">
            <h3 className="mb-2 text-2xl font-bold text-white">Star Collector Challenge</h3>
            <p className="mb-4 text-green-300/80">Click as many stars as you can in 30 seconds!</p>
            <div className="mb-6 text-sm text-green-300/60">
              Best Score: <span className="font-bold text-green-400">{bestScore}</span>
            </div>
          </div>
          <motion.button
            onClick={handleStartGame}
            className="px-8 py-3 font-semibold text-white transition-all rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-lg hover:shadow-green-500/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Game
          </motion.button>
        </motion.div>
      )}

      {gameActive && (
        <>
          {/* HUD */}
          <div className="absolute z-30 flex items-center justify-between top-4 left-4 right-4">
            <div className="font-bold text-white">
              Score: <span className="text-green-400">{score}</span>
            </div>
            <div className={`font-bold ${timeLeft <= 10 ? 'text-red-800' : 'text-green-400'}`}>
              Time: {timeLeft}s
            </div>
          </div>

          {/* Stars */}
          <AnimatePresence>
            {stars.map((star) => (
              <motion.button
                key={star.id}
                className="absolute z-10 flex items-center justify-center cursor-pointer"
                style={{
                  left: star.x - star.size * 0.9,
                  top: star.y - star.size * 0.9,
                  width: star.size,
                  height: star.size,
                  fontSize: star.size+"px",
                }}
                onClick={() => handleCollectStar(star.id)}
                initial={{ scale: 0, opacity: 1 }}
                animate={{
                  scale: 1,
                  filter: [
                    'drop-shadow(0 0 10px rgba(251, 236, 128, 0.8)) drop-shadow(0 0 20px rgba(137, 233, 133, 0.8))',
                    'drop-shadow(0 0 15px rgba(251, 236, 128, 1)) drop-shadow(0 0 30px rgba(137, 233, 133, 1))',
                    'drop-shadow(0 0 10px rgba(251, 236, 128, 0.8)) drop-shadow(0 0 20px rgba(137, 233, 133, 0.8))',
                  ],
                }}
                transition={{ duration: 0.2, filter: { duration: 1.5, repeat: Infinity } }}
                whileHover={{
                  scale: 1.3,
                  filter: 'drop-shadow(0 0 20px rgba(251, 236, 128, 1)) drop-shadow(0 0 40px rgba(137, 233, 133, 1))',
                }}
              >
                ✨
              </motion.button>
            ))}
          </AnimatePresence>
        </>
      )}

      {gameOver && (
        <motion.div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 bg-slate-900/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-center">
            <h3 className="mb-4 text-2xl font-bold text-white">Game Over!</h3>
            <div className="mb-6 space-y-2">
              <div className="text-lg text-brand-orange/80">
                Final Score: <span className="text-2xl font-bold text-brand-orange/80">{score}</span>
              </div>
              <div className="text-sm text-green-300/80">
                Best Score: <span className="font-bold text-green-400">{bestScore}</span>
              </div>
              {score === bestScore && score > 0 && (
                <motion.div
                  className="mt-2 font-bold text-emerald-400"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.6 }}
                >
                  🎉 New High Score! 🎉
                </motion.div>
              )}
            </div>
          </div>
          <motion.button
            onClick={handlePlayAgain}
            className="px-8 py-3 font-semibold text-white transition-all rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-lg hover:shadow-green-500/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Play Again
          </motion.button>
        </motion.div>
      )}
    </div>
</div>
  )
}
