"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { slides } from "../gallery/data"
import { UniversalImage } from "../ui/Image/UniversalImage"
import WrapperModal from "../ui/modal/wrapperModal/WrapperModal"
import { useSliderNavigation } from "./lib/useSliderNavigation"
import { SingleSlide } from "./singleSlide/SingleSlide"
import styles from "./Slider.module.scss"

export const Slider = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const sliderRef = useRef<HTMLElement | null>(null)
  const modalContainerRef = useRef<HTMLElement | null>(null)
  const startX = useRef(0)
  const isMobile = useRef(false)

  const { active, direction, throttleSlideChange, timeoutRef } =
    useSliderNavigation({
      length: slides.length,
      containerRef: modalOpen ? modalContainerRef : sliderRef
    })

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

  const current = slides[active]
  const preview = current.media[0]

  const handleSwipe = {
    start: (_: any, info: any) => {
      if (!isMobile.current) return
      startX.current = info.point.x
    },
    end: (_: any, info: any) => {
      if (!isMobile.current || timeoutRef.current) return
      const deltaX = info.point.x - startX.current
      if (Math.abs(deltaX) > 50) {
        throttleSlideChange(deltaX < 0 ? 1 : -1)
      }
    }
  }

  return (
    <>
      <section
        ref={sliderRef}
        className={styles.slider}
        aria-label="Примеры проектов студии"
        role="region"
      >
        <AnimatePresence mode="wait">
          <motion.figure
            key={preview.src}
            className={styles.slide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            onPanStart={handleSwipe.start}
            onPanEnd={handleSwipe.end}
            onClick={() => setModalOpen(true)}
          >
            <motion.div
              className={styles.imageWrapper}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <UniversalImage
                src={preview.src}
                alt={current.title}
                className={styles.image}
                priority={active === 0}
                fill
              />
            </motion.div>

            <motion.figcaption
              key={current.title}
              className={styles.caption}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2>{current.title}</h2>
            </motion.figcaption>
          </motion.figure>
        </AnimatePresence>
      </section>

      <WrapperModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <SingleSlide slide={slides[active]} direction={direction} />
      </WrapperModal>
    </>
  )
}
