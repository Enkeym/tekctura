import { slides } from "./data"
import styles from "./Gallery.module.scss"
import { GalleryItem } from "./galleryItem/GalleryItem"

export const Gallery = () => (
  <section className={styles.grid} aria-label="Галерея проектов">
    {slides.map((slide) => (
      <GalleryItem key={slide.title} slide={slide} />
    ))}
  </section>
)
