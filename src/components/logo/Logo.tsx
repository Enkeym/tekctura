"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import styles from "./logo.module.scss"
import { d1, d2 } from "./path"

export const Logo = () => {
  const controlsBase = useAnimation()
  const controlsR = useAnimation()
  const controlsG = useAnimation()
  const controlsB = useAnimation()

  const [hovered, setHovered] = useState(false)
  const glitchInterval = useRef<NodeJS.Timeout | null>(null)
  const glitchTimeout = useRef<NodeJS.Timeout | null>(null)
  const controlsSplitBottom = useAnimation()

  const startGlitch = () => {
    // Верхняя часть логотипа — уходит вверх
    controlsBase.start({
      y: [0, -10, -20, -10, 0],
      transition: { duration: 0.5 }
    })

    controlsSplitBottom.start({
      y: [0, 12, 20, 12, 0],
      transition: { duration: 0.5 }
    })

    controlsR.start({
      x: [-16, 12, -8, 0],
      y: [-10, 10, 4, 0],
      opacity: [0, 1, 1, 0],
      transition: { duration: 0.4 }
    })

    controlsG.start({
      x: [16, -14, 6, 0],
      y: [10, -12, 6, 0],
      opacity: [0, 1, 1, 0],
      transition: { duration: 0.4 }
    })

    controlsB.start({
      x: [8, -12, 16, -10, 0],
      y: [-10, 14, -8, 4, 0],
      opacity: [0, 1, 1, 0],
      transition: { duration: 0.4 }
    })
  }

  useEffect(() => {
    if (hovered) {
      glitchTimeout.current = setTimeout(() => {
        startGlitch()
        glitchInterval.current = setInterval(startGlitch, 1000)
      }, 1000)
    } else {
      controlsBase.stop()
      controlsR.stop()
      controlsG.stop()
      controlsB.stop()
      if (glitchTimeout.current) clearTimeout(glitchTimeout.current)
      if (glitchInterval.current) clearInterval(glitchInterval.current)
    }

    return () => {
      if (glitchTimeout.current) clearTimeout(glitchTimeout.current)
      if (glitchInterval.current) clearInterval(glitchInterval.current)
    }
  }, [hovered])

  const renderLayer = (color: string, controls: any) => (
    <>
      <motion.path
        d={d1}
        animate={controls}
        initial={{ opacity: 0 }}
        style={{
          fill: color,
          mixBlendMode: "screen",
          filter: "blur(0.8px) brightness(1.3)",
          pointerEvents: "none"
        }}
      />
      <motion.path
        d={d2}
        animate={controls}
        initial={{ opacity: 0 }}
        style={{
          fill: color,
          mixBlendMode: "screen",
          filter: "blur(0.8px) brightness(1.3)",
          pointerEvents: "none"
        }}
      />
    </>
  )

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2000 440"
      className={styles.logoSvg}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* БЕЛЫЙ ЛОГОТИП С РАЗРЫВОМ */}
      <motion.path d={d1} fill="white" animate={controlsBase} />
      <motion.path d={d2} fill="white" animate={controlsSplitBottom} />

      {/* RGB СЛОИ */}
      {renderLayer("red", controlsR)}
      {renderLayer("lime", controlsG)}
      {renderLayer("blue", controlsB)}
    </svg>
  )
}
