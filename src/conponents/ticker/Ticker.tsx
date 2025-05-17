"use client"

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  wrap
} from "framer-motion"
import { useLayoutEffect, useRef, useState } from "react"
import styles from "./Ticker.module.scss"

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
  const baseVelocity = 150
  const loopRef = useRef<HTMLDivElement>(null)
  const [loopWidth, setLoopWidth] = useState(0)

  // Измеряем только один цикл
  useLayoutEffect(() => {
    if (loopRef.current) {
      setLoopWidth(loopRef.current.offsetWidth)
    }
  }, [])

  const x = useTransform(baseX, (v) => `${wrap(-loopWidth, 0, v)}px`)

  useAnimationFrame((_, delta) => {
    const moveBy = baseVelocity * (delta / 1000)
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className={styles.ticker}>
      <motion.div className={styles.tickerIn} style={{ x }}>
        <div className={styles.loop} ref={loopRef}>
          {phrases.map((txt, idx) => (
            <span className={styles.tickerItem} key={`a-${idx}`}>
              {txt}
            </span>
          ))}
        </div>
        <div className={styles.loop}>
          {phrases.map((txt, idx) => (
            <span className={styles.tickerItem} key={`b-${idx}`}>
              {txt}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
