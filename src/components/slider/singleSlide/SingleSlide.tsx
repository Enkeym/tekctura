import { Slide } from "@/components/gallery/types/slide"
import { UniversalImage } from "@/components/ui/Image/UniversalImage"
import { AnimatePresence, motion } from "framer-motion"
import { useRef } from "react"
import { useSliderNavigation } from "../lib/useSliderNavigation"
import styles from "./SingleSlide.module.scss"

interface Props {
  slide: Slide
  direction: number
}

export const SingleSlide = ({ slide, direction }: Props) => {
  const { media, title, description } = slide
  const localRef = useRef<HTMLDivElement | null>(null)

  const { active: activeMedia, throttleSlideChange: onMediaChange } =
    useSliderNavigation({
      length: slide.media.length,
      containerRef: localRef
    })

  const preview = media[activeMedia]

  return (
    <motion.div className={styles.card} layout ref={localRef}>
      <div className={styles.imageWrapper}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={preview.src}
            custom={direction}
            initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -100 : 100, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <UniversalImage
              src={preview.src}
              alt={title}
              className={styles.image}
              fill={false}
              width={800}
              height={450}
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.text}>
        <h2 className={styles.title}>{title}</h2>
        <motion.p className={styles.description} layout aria-expanded={true}>
          {description}
        </motion.p>

        {/* Навигация по media */}
        <div className={styles.nav}>
          <button onClick={() => onMediaChange(-1)}>&larr;</button>
          <button onClick={() => onMediaChange(1)}>&rarr;</button>
        </div>

        <div className={styles.dots}>
          {media.map((_, i) => (
            <button
              key={i}
              onClick={() => onMediaChange(i - activeMedia)}
              className={i === activeMedia ? styles.activeDot : styles.dot}
              aria-label={`Медиа ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
