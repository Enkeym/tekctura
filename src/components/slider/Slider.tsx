"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { slides } from "../gallery/data"
import { MediaDots } from "../ui/media/mediaDots/mediaDots"
import { MediaRenderer } from "../ui/media/mediaRender/MediaRenderer"
import WrapperModal from "../ui/modal/wrapperModal/WrapperModal"
import { useSliderNavigation } from "./lib/useSliderNavigation"
import { SingleSlide } from "./singleSlide/SingleSlide"


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
  const isDragging = useRef(false)

  const { active, setActive, goNext, goPrev } = useSliderNavigation({
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
        className="relative flex h-[70vh] w-full items-center justify-center overflow-hidden"
        aria-label="Примеры проектов студии"
        role="region"
        tabIndex={0}
        onClick={() => {
          if (isDragging.current) return
          setModalOpen(true)
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setModalOpen(true)
          if (e.key === "ArrowRight") goNext()
          if (e.key === "ArrowLeft") goPrev()
        }}
      >
        <AnimatePresence mode="sync" initial={false}>
          {typeof prevActive === "number" && prevActive !== active && (
            <figure
              className="absolute inset-0 touch-pan-y select-none will-change-transform"
              key={`prev-${prevActive}`}
              style={{ zIndex: 1 }}
            >
              <div className="flex flex-col items-center">
                <MediaRenderer
                  kind={slides[prevActive].media[0].kind}
                  src={slides[prevActive].media[0].src}
                  alt={slides[prevActive].title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <MediaDots activeIndex={active} total={slides.length} />
              </div>
              <figcaption className="absolute bottom-6 left-9 max-w-[80%] text-white drop-shadow-md">
                <h3 className="text-xl font-bold leading-tight">
                  {slides[prevActive].title.toUpperCase()}
                </h3>
              </figcaption>
            </figure>
          )}

          <motion.figure
            key={`motion-${active}`}
            className="absolute inset-0 touch-pan-y select-none will-change-transform"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{}}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{
              zIndex: 2,
              cursor: "grab",
              pointerEvents: "auto"
            }}
            drag="x"
            dragElastic={0.2}
            dragSnapToOrigin
            onDragStart={() => {
              isDragging.current = true
            }}
            onDragEnd={(_, info) => {
              const swipePower = Math.abs(info.offset.x) * info.velocity.x

              if (swipePower < -1000) {
                goNext()
              } else if (swipePower > 1000) {
                goPrev()
              }

              setTimeout(() => {
                isDragging.current = false
              }, 50)
            }}
          >
            <div className="flex flex-col items-center">
              <MediaRenderer
                kind={preview.kind}
                src={preview.src}
                alt={current.title}
                className="absolute inset-0 h-full w-full object-cover"
                priority={true}
              />
            </div>

            <motion.figcaption
              className="absolute bottom-6 left-9 max-w-[80%] text-white drop-shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
            >
              <h3 className="text-xl font-bold leading-tight">
                {current.title.toUpperCase()}
              </h3>
            </motion.figcaption>
          </motion.figure>
        </AnimatePresence>

        <MediaDots activeIndex={active} total={slides.length} />
      </section>

      <WrapperModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <SingleSlide slide={slides[active]} />
      </WrapperModal>
    </>
  )
}
