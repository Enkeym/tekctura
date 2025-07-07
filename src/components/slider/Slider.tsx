"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { slides } from "../gallery/data"
import { MediaDots } from "../ui/media/mediaDots/mediaDots"
import { MediaRenderer } from "../ui/media/mediaRender/MediaRenderer"
import WrapperModal from "../ui/modal/wrapperModal/WrapperModal"
import { useSliderNavigation } from "./lib/useSliderNavigation"
import { SingleSlide } from "./singleSlide/SingleSlide"
import styles from "./Slider.module.scss"

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined)
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

export const Slider = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const sliderRef = useRef<HTMLElement | null>(null)
  const isDragging = useRef<false | { startX: number }>(false)
  const wasDraggedRecently = useRef(false)

  const { active, setActive, goNext, goPrev, direction } = useSliderNavigation({
    length: slides.length,
    containerRef: sliderRef
  })

  const current = slides[active]
  const preview = current.media[0]
  const prevActive = usePrevious(active)

  return (
    <>
      <section
        ref={sliderRef}
        className={styles.slider}
        aria-label="Примеры проектов студии"
        role="region"
        tabIndex={0}
        onClick={() => {
          if (wasDraggedRecently.current) return
          setModalOpen(true)
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setModalOpen(true)
          if (e.key === "ArrowRight") goNext()
          if (e.key === "ArrowLeft") goPrev()
        }}
      >
        {!modalOpen && (
          <AnimatePresence mode="sync" initial={false}>
            {typeof prevActive === "number" && prevActive !== active && (
              <figure
                className={styles.slide}
                key={`prev-${prevActive}`}
                style={{ zIndex: 1 }}
              >
                <div className={styles.imageWrapper}>
                  <MediaRenderer
                    kind={slides[prevActive].media[0].kind}
                    src={slides[prevActive].media[0].src}
                    alt={slides[prevActive].title}
                    className={styles.media}
                  />
                  <MediaDots activeIndex={active} total={slides.length} />
                </div>
                <figcaption className={styles.caption}>
                  <p className={styles.captionText}>
                    {slides[prevActive].title.toUpperCase()}
                  </p>
                </figcaption>
              </figure>
            )}

            <motion.figure
              key={`motion-${active}`}
              className={styles.slide}
              initial={{ x: direction > 0 ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: direction > 0 ? "-100%" : "100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{
                zIndex: 2,
                cursor: "grab",
                pointerEvents: "auto"
              }}
              onPointerDown={(e) => {
                isDragging.current = { startX: e.clientX }
              }}
              onPointerMove={(e) => {
                if (
                  !isDragging.current ||
                  typeof isDragging.current === "boolean"
                )
                  return
                const deltaX = e.clientX - isDragging.current.startX
                const threshold = 80

                if (deltaX < -threshold) {
                  goNext()
                  isDragging.current = false
                  wasDraggedRecently.current = true
                  setTimeout(() => {
                    wasDraggedRecently.current = false
                  }, 200)
                } else if (deltaX > threshold) {
                  goPrev()
                  isDragging.current = false
                  wasDraggedRecently.current = true
                  setTimeout(() => {
                    wasDraggedRecently.current = false
                  }, 200)
                }
              }}
              onPointerUp={() => {
                isDragging.current = false
              }}
            >
              <div className={styles.imageWrapper}>
                <MediaRenderer
                  key={`${preview.src}-${active}`}
                  kind={preview.kind}
                  src={preview.src}
                  alt={current.title}
                  className={styles.media}
                  priority={active === 0}
                />
              </div>

              <figcaption className={styles.caption}>
                <motion.p
                  className={styles.captionText}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
                >
                  {current.title.toUpperCase()}
                </motion.p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        )}
        <MediaDots activeIndex={active} total={slides.length} />
      </section>

      <WrapperModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <SingleSlide slide={slides[active]} />
      </WrapperModal>
    </>
  )
}
