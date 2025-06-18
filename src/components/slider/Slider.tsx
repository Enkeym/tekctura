"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useRef, useState } from "react"
import { slides } from "@/entities/gallery/slides"
import { MediaDots } from "@/shared/ui/media/mediaDots/mediaDots"
import { MediaRenderer } from "@/shared/ui/media/mediaRender/MediaRenderer"
import WrapperModal from "@/shared/ui/modal/wrapperModal/WrapperModal"
import { useSliderNavigation } from "./lib/useSliderNavigation"
import { SingleSlide } from "./singleSlide/SingleSlide"
import { slideInRight } from "@/shared/animations/slideIn"
import { captionFade } from "@/shared/animations/captionFade"
import { usePrevious } from "@/shared/lib/usePrevious"


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
            {...slideInRight}
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
              {...captionFade}
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
