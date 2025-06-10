"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useRef, useState } from "react"
import { slides } from "../gallery/data"
import { UniversalImage } from "../ui/Image/UniversalImage"
import WrapperModal from "../ui/modal/wrapperModal/WrapperModal"
import { useSliderNavigation } from "./lib/useSliderNavigation"
import { SingleSlide } from "./singleSlide/SingleSlide"
import styles from "./Slider.module.scss"

export const Slider = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const sliderRef = useRef<HTMLElement | null>(null)

  const { active } = useSliderNavigation({
    length: slides.length,
    containerRef: sliderRef
  })

  const current = slides[active]
  const preview = current.media[0]

  return (
    <>
      <section
        ref={sliderRef}
        className={styles.slider}
        aria-label="Примеры проектов студии"
        role="region"
        onClick={() => setModalOpen(true)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setModalOpen(true)
        }}
      >
        <AnimatePresence mode="wait">
          <motion.figure
            key={preview.src}
            className={styles.slide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
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
        <SingleSlide slide={slides[active]} />
      </WrapperModal>
    </>
  )
}
