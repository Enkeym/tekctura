"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"
import { SlideModal } from "../ui/modal/slideModal/SlideModal"
import styles from "./Slider.module.scss"

export interface Slide {
  title: string
  description?: string
  media: { type: "gif" | "image"; src: string }[]
}

const slides: Slide[] = [
  {
    title: "Цифровой лес",
    media: [
      { src: "/assets/videos/les.gif", type: "gif" },
      { src: "/assets/videos/les_2.gif", type: "gif" }
    ]
  },
  {
    title: "ЭХО",
    media: [
      { type: "gif", src: "/assets/videos/tv_3_2.gif" },
      { type: "gif", src: "/assets/videos/tv_3.gif" }
    ]
  },
  {
    title: "Перформанс",
    media: [
      { type: "image", src: "/assets/images/Light-5.jpg" },
      {
        type: "image",
        src: "/assets/images/Firelight-Labyrinth_render-02_supplied.jpg"
      },
      {
        type: "image",
        src: "/assets/images/SOF_8434.jpg"
      }
    ]
  }
]

export const Slider = () => {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
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
  const preview = current.media[0]

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
          key={preview.src}
          className={styles.slide}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          onClick={() => setModalOpen(true)}
        >
          <motion.img
            src={preview.src}
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

      <SlideModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={current.title}
        description={current.description}
        media={current.media}
      />
    </section>
  )
}
