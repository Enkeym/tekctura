import { Slide } from "@/components/gallery/types/slide"

import { MediaDots } from "@/components/ui/media/mediaDots/mediaDots"
import { MediaRenderer } from "@/components/ui/media/mediaRender/MediaRenderer"
import { AnimatePresence, motion } from "framer-motion"
import { useRef } from "react"
import { useSliderNavigation } from "../lib/useSliderNavigation"
import styles from "./SingleSlide.module.scss"

interface Props {
  slide: Slide
}

export const SingleSlide = ({ slide }: Props) => {
  const { media, title, description } = slide
  const localRef = useRef<HTMLDivElement | null>(null)

  const { active: activeMedia } = useSliderNavigation({
    length: media.length,
    containerRef: localRef
  })

  const preview = media[activeMedia]

  return (
    <motion.div
      className={styles.card}
      layout
      ref={localRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={title}
    >
      <AnimatePresence mode="wait">
        <motion.figure
          className={styles.imageWrapper}
          key={activeMedia}
          layoutId={`slide-media-${activeMedia}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <MediaRenderer
            className={styles.image}
            src={preview.src}
            alt={`${title} — слайд ${activeMedia + 1}`}
            kind={preview.kind}
            priority={false}
          />
          {media.length > 1 && (
            <MediaDots activeIndex={activeMedia} total={media.length} />
          )}
        </motion.figure>
      </AnimatePresence>

      <div className={styles.text}>
        <h2 className={styles.title}>{title}</h2>
        <motion.p
          className={styles.description}
          layout
          aria-expanded="true"
          tabIndex={0}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  )
}
