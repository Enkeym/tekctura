"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef } from "react"
import styles from "./Slider.module.scss"
import { useSliderNavigation } from "./lib/useSliderNavigation"

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
  const { active, direction, throttleSlideChange, timeoutRef } =
    useSliderNavigation(slides.length)
  const sliderRef = useRef<HTMLElement | null>(null)
  const startX = useRef(0)
  const isMobile = useRef(false)

  // Обновление флага тач-устройств
  useEffect(() => {
    const check = () => {
      const small = window.matchMedia("(max-width: 768px)").matches
      const coarse = window.matchMedia("(pointer: coarse)").matches
      isMobile.current = small && coarse
    }
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!sliderRef.current?.contains(e.target as Node)) return
      const delta = e.deltaY > 0 ? 1 : -1
      throttleSlideChange(delta)
    }

    window.addEventListener("wheel", handleWheel, { passive: true })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [throttleSlideChange])

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

  const handleSwipe = {
    start: (event: any, info: any) => {
      if (!isMobile.current) return
      startX.current = info.point.x
    },
    end: (event: any, info: any) => {
      if (!isMobile.current || timeoutRef.current) return
      const deltaX = info.point.x - startX.current
      if (Math.abs(deltaX) > 50) {
        throttleSlideChange(deltaX < 0 ? 1 : -1)
      }
    }
  }

  return (
    <section
      ref={sliderRef}
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
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onPanStart={handleSwipe.start}
          onPanEnd={handleSwipe.end}
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
    </section>
  )
}
