import { Slide } from "@/components/gallery/types/slide"
import { UniversalImage } from "@/components/ui/Image/UniversalImage"
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
            key={preview.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <UniversalImage
              src={preview.src}
              alt={title}
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
