import { motion } from "framer-motion"
import { Slide } from "../types/slide"
import styles from "./GalleryItem.module.scss"

export const GalleryItem = ({ slide }: { slide: Slide }) => (
  <motion.article
    className={styles.card}
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 40 }}
    transition={{ duration: 0.4 }}
    role="group"
    aria-label={`Слайд: ${slide.title}`}
  >
    <div className={styles.media}>
      <img
        src={slide.media[0].src}
        alt={`Медиа: ${slide.title}`}
        loading="lazy"
      />
    </div>
    <h3 className={styles.title}>{slide.title}</h3>
  </motion.article>
)
