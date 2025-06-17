"use client"

import { Slide } from "@/components/gallery/types/slide"
import { MediaDots } from "@/components/ui/media/mediaDots/mediaDots"
import { MediaRenderer } from "@/components/ui/media/mediaRender/MediaRenderer"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { useSliderNavigation } from "../lib/useSliderNavigation"
import styles from "./SingleSlide.module.scss"

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined)
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

interface Props {
  slide: Slide
}

export const SingleSlide = ({ slide }: Props) => {
  const { media, title, description } = slide
  const localRef = useRef<HTMLDivElement | null>(null)
  const isDragging = useRef(false)

  const {
    active: activeMedia,
    goNext,
    goPrev
  } = useSliderNavigation({
    length: media.length,
    containerRef: localRef
  })

  const prevActiveMedia = usePrevious(activeMedia)
  const current = media[activeMedia]

  return (
    <motion.div className={styles.card} ref={localRef}>
      <div className={styles.mediaContainer}>
        <AnimatePresence mode="sync" initial={false}>
          {typeof prevActiveMedia === "number" &&
            prevActiveMedia !== activeMedia && (
              <figure
                className={styles.imageWrapper}
                key={`prev-${prevActiveMedia}`}
                style={{ zIndex: 1 }}
              >
                <MediaRenderer
                  className={styles.image}
                  src={media[prevActiveMedia].src}
                  alt={`${title} — слайд ${prevActiveMedia + 1}`}
                  kind={media[prevActiveMedia].kind}
                />
                {media.length > 1 && (
                  <MediaDots activeIndex={activeMedia} total={media.length} />
                )}
              </figure>
            )}

          <motion.figure
            key={`motion-${activeMedia}`}
            className={styles.imageWrapper}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{}}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ zIndex: 2, cursor: "grab", touchAction: "pan-y" }}
            drag="x"
            dragElastic={0.2}
            dragSnapToOrigin
            onDragStart={() => {
              isDragging.current = true
            }}
            onDragEnd={(_, info) => {
              const swipePower = Math.abs(info.offset.x) * info.velocity.x
              if (swipePower < -1000) goNext()
              else if (swipePower > 1000) goPrev()

              setTimeout(() => {
                isDragging.current = false
              }, 50)
            }}
          >
            <MediaRenderer
              className={styles.image}
              src={current.src}
              alt={`${title} — слайд ${activeMedia + 1}`}
              kind={current.kind}
            />

            {media.length > 1 && (
              <MediaDots activeIndex={activeMedia} total={media.length} />
            )}
          </motion.figure>
          <motion.figcaption
            className={styles.caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
          >
            <h3 className={styles.title}>{title.toUpperCase()}</h3>
          </motion.figcaption>
        </AnimatePresence>
      </div>

      <div className={styles.text}>
        <motion.p className={styles.description} layout>
          {description}
        </motion.p>
      </div>
    </motion.div>
  )
}
