import { Slide } from "@/components/gallery/types/slide"
import { MediaRenderer } from "@/components/ui/media/MediaRenderer"
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
    <motion.div className={styles.card} layout ref={localRef}>
      <div className={styles.imageWrapper}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMedia}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <MediaRenderer
              src={preview.src}
              alt={title}
              kind={preview.kind}
              className={styles.image}
              fill={false}
              width={800}
              height={450}
              priority={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.text}>
        <h2 className={styles.title}>{title}</h2>
        <motion.p className={styles.description} layout aria-expanded="true">
          {description}
        </motion.p>
      </div>
    </motion.div>
  )
}
