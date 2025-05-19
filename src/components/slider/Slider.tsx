"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"
import styles from "./Slider.module.scss"

interface Slide {
  title: string
  type: "gif" | "image"
  src: string
}

const slides: Slide[] = [
  { title: "Цифровой лес", type: "gif", src: "/assets/videos/les.gif" },
  { title: "ЭХО", type: "gif", src: "/assets/videos/tv_3_2.gif" },
  {
    title: "Перформанс",
    type: "image",
    src: "/assets/images/Light-5.jpg"
  }
]

export const Slider = () => {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(0) // -1 влево, 1 вправо
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const changeSlide = useCallback((delta: number) => {
    setDirection(delta)
    setActive((prev) => (prev + delta + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (timeoutRef.current) return
      const delta = e.deltaY > 0 ? 1 : -1
      changeSlide(delta)
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null
      }, 1000)
    }

    window.addEventListener("wheel", handleWheel, { passive: true })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [changeSlide])

  const current = slides[active]

  // Анимации с учётом направления
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.6, ease: "easeIn" }
    })
  }

  return (
    <section
      className={styles.slider}
      aria-label="Примеры проектов студии"
      role="region"
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.figure
          key={current.src}
          className={styles.slide}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <motion.img
            src={current.src}
            alt={current.title}
            loading="lazy"
            className={styles.image}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />

          <motion.figcaption
            className={styles.caption}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2>{current.title}</h2>
          </motion.figcaption>
        </motion.figure>
      </AnimatePresence>
    </section>
  )
}
