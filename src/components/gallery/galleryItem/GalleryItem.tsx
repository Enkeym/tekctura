// galleryItem/GalleryItem.tsx
import { MediaRenderer } from "@/components/ui/media/mediaRender/MediaRenderer"
import { motion } from "framer-motion"
import { Slide } from "../types/slide"
import styles from "./GalleryItem.module.scss"

interface Props {
  slide: Slide
  onClick?: () => void
}

export const GalleryItem = ({ slide, onClick }: Props) => {
  const preview = slide.media[0]

  return (
    <motion.article
      className={styles.card}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Открыть слайд: ${slide.title}`}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      <div className={styles.media}>
        <MediaRenderer
          src={preview.src}
          alt={slide.title}
          kind={preview.kind}
          className={styles.image}
        />
        <h3 className={styles.title}>{slide.title}</h3>
      </div>
    </motion.article>
  )
}
