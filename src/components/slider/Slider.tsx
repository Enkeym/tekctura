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
      if (timeoutRef.current || modalOpen) return
      const delta = e.deltaY > 0 ? 1 : -1
      changeSlide(delta)
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null
      }, 1000)
    }

    window.addEventListener("wheel", handleWheel, { passive: true })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [changeSlide, modalOpen])

  const current = slides[active]
  const preview = current.media[0]

  const variants = {
    enter: (direction: number) => ({
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
      z: -200
    }),
    center: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      z: 0,
      transition: {
        duration: 0.8,
        ease: [0.33, 1, 0.68, 1]
      }
    },
    exit: (direction: number) => ({
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? -45 : 45,
      z: -200,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
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
