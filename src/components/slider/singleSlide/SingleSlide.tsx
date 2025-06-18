"use client"

import { Slide } from "@/components/gallery/types/slide"
import { MediaDots } from "@/components/ui/media/mediaDots/mediaDots"
import { MediaRenderer } from "@/components/ui/media/mediaRender/MediaRenderer"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { useSliderNavigation } from "../lib/useSliderNavigation"


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
    <motion.div
      className="relative mx-auto flex w-full max-w-[50rem] flex-col overflow-hidden rounded-xl bg-[#111] text-white"
      ref={localRef}
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <AnimatePresence mode="sync" initial={false}>
          {typeof prevActiveMedia === "number" &&
            prevActiveMedia !== activeMedia && (
              <figure
                className="absolute inset-0 flex flex-col items-center justify-center"
                key={`prev-${prevActiveMedia}`}
                style={{ zIndex: 1 }}
              >
                <MediaRenderer
                  className="h-full w-full object-cover"
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
            className="absolute inset-0 flex flex-col items-center justify-center"
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
              className="h-full w-full object-cover"
              src={current.src}
              alt={`${title} — слайд ${activeMedia + 1}`}
              kind={current.kind}
            />

            {media.length > 1 && (
              <MediaDots activeIndex={activeMedia} total={media.length} />
            )}
          </motion.figure>
          <motion.figcaption
            className="absolute left-8 top-6 z-10 max-w-[80%] pr-4 text-white drop-shadow-md md:left-4 md:top-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
          >
            <h3 className="m-0 font-bold leading-[1.2] md:text-lg">{title.toUpperCase()}</h3>
          </motion.figcaption>
        </AnimatePresence>
      </div>

      <div className="p-6">
        <motion.p className="max-h-28 overflow-y-auto text-base opacity-80" layout>
          {description}
        </motion.p>
      </div>
    </motion.div>
  )
}
