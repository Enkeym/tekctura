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
  const totalSlides = slides.length
  const isJump =
    prevActive !== undefined &&
    Math.abs(active - prevActive) !== 1 &&
    !(active === 0 && prevActive === totalSlides - 1) &&
    !(active === totalSlides - 1 && prevActive === 0)

  const blockNextInteraction = (delay = 300) => {
    wasDraggedRecently.current = true
    setTimeout(() => {
      wasDraggedRecently.current = false
    }, delay)
  }

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
        onWheel={(e) => {
          if (wasDraggedRecently.current) return
          const delta = e.deltaY
          if (delta > 20) {
            goNext()
            blockNextInteraction()
          } else if (delta < -20) {
            goPrev()
            blockNextInteraction()
          }
        }}
      >
        {/* Предыдущий слайд */}
        {typeof prevActive === "number" && (
          <figure
            className={styles.slide}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1
            }}
          >
            <div className={styles.imageWrapper}>
              <MediaRenderer
                kind={slides[prevActive].media[0].kind}
                src={slides[prevActive].media[0].src}
                alt={slides[prevActive].title}
                className={styles.media}
              />
            </div>
          </figure>
        )}

        {/* Текущий слайд */}
        <AnimatePresence mode="popLayout">
          <motion.figure
            key={active}
            className={styles.slide}
            custom={direction}
            initial={
              isJump
                ? { opacity: 0, scale: 0.98 }
                : { x: direction > 0 ? "100%" : "-100%", opacity: 0 }
            }
            animate={isJump ? { opacity: 1, scale: 1 } : { x: 0, opacity: 1 }}
            exit={
              isJump
                ? { opacity: 0, scale: 0.98 }
                : { x: direction > 0 ? "-100%" : "100%", opacity: 0 }
            }
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{
              zIndex: 2,
              cursor: "grab",
              pointerEvents: "auto",
              position: "relative"
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
                blockNextInteraction()
              } else if (deltaX > threshold) {
                goPrev()
                isDragging.current = false
                blockNextInteraction()
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
          </motion.figure>
        </AnimatePresence>

        {/* Заголовок теперь отдельно и срабатывает AnimatePresence */}
        <figcaption className={styles.caption}>
          <AnimatePresence mode="sync">
            {current && (
              <motion.p
                key={`caption-${active}`}
                className={styles.captionText}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  opacity: { duration: 0.3 },
                  y: { duration: 0.8 }
                }}
              >
                {current.title.toUpperCase()}
              </motion.p>
            )}
          </AnimatePresence>
        </figcaption>

        <MediaDots activeIndex={active} total={slides.length} />
      </section>

      <WrapperModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <SingleSlide slide={slides[active]} />
      </WrapperModal>
    </>
  )
}
