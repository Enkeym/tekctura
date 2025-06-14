import { slides } from "./data"
import styles from "./Gallery.module.scss"
import { GalleryItem } from "./galleryItem/GalleryItem"

interface GalleryProps {
  onSelectSlide: (index: number) => void
}

export const Gallery = ({ onSelectSlide }: GalleryProps) => (
  <section className={styles.grid}>
    {slides.map((slide, index) => (
      <GalleryItem
        key={slide.title}
        slide={slide}
        onClick={() => onSelectSlide(index)}
      />
    ))}
  </section>
)
