"use client"

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  wrap
} from "framer-motion"
import { useLayoutEffect, useRef, useState } from "react"


const phrases = [
  "технологии",
  "комплексное сопровождение мероприятий",
  "медиа-инсталляции",
  "творческие и технологические решения",
  "искусство",
  "прозрачность",
  "человек",
  ""
]

export const Ticker = () => {
  const baseX = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const loopRef = useRef<HTMLDivElement>(null)
  const [loopWidth, setLoopWidth] = useState(0)

  // Сохраняем текущую скорость отдельно
  const defaultVelocity = 90
  const velocityRef = useRef(defaultVelocity)

  useLayoutEffect(() => {
    if (loopRef.current) {
      setLoopWidth(loopRef.current.offsetWidth)
    }
  }, [])

  const x = useTransform(baseX, (v) => `${wrap(-loopWidth, 0, v)}px`)

  useAnimationFrame((_, delta) => {
    const moveBy = velocityRef.current * (delta / 1000)
    baseX.set(baseX.get() + moveBy)
  })

  const handleMouseEnter = () => {
    velocityRef.current = 0
  }

  const handleMouseLeave = () => {
    velocityRef.current = defaultVelocity
  }

  return (
    <div
      className="w-full overflow-hidden cursor-pointer [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.8)_5%,#000_15%,#000_85%,rgba(0,0,0,0.8)_95%,transparent_100%)]"
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        <div className="inline-flex gap-[35px]" ref={loopRef}>
          {phrases.map((txt, idx) => (
            <span className="whitespace-nowrap uppercase" key={`a-${idx}`}>
              {txt}
            </span>
          ))}
        </div>
        <div className="inline-flex gap-[35px]">
          {phrases.map((txt, idx) => (
            <span className="whitespace-nowrap uppercase" key={`b-${idx}`}>
              {txt}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
