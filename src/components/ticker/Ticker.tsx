"use client"

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  wrap
} from "framer-motion"
import { useLayoutEffect, useRef, useState } from "react"
import { slides } from "../gallery/data"
import { Gallery } from "../gallery/Gallery"
import { SingleSlide } from "../slider/singleSlide/SingleSlide"
import { GalleryModal } from "../ui/modal/galleryModal/GalleryModal"
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
  const containerRef = useRef<HTMLDivElement>(null)
  const loopRef = useRef<HTMLDivElement>(null)
  const [loopWidth, setLoopWidth] = useState(0)

  //Модальное окно для галереи
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [activeSlide, setActiveSlide] = useState<number | null>(null)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => {
    if (activeSlide !== null) {
      setActiveSlide(null)
    } else {
      setIsOpen(false)
    }
  }

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
    <>
      <div
        className={styles.ticker}
        ref={containerRef}
        onClick={handleOpen}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="button"
        tabIndex={0}
        aria-label="Открыть модальное окно"
      >
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

      <GalleryModal isOpen={isOpen} onClose={handleClose}>
        {activeSlide === null ? (
          <Gallery onSelectSlide={(index) => setActiveSlide(index)} />
        ) : (
          <SingleSlide slide={slides[activeSlide]} />
        )}
      </GalleryModal>
    </>
  )
}
