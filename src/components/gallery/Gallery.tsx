import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { slides } from "./data"
import styles from "./Gallery.module.scss"
import { GalleryItem } from "./galleryItem/GalleryItem"

interface GalleryProps {
  onSelectSlide: (index: number) => void
}

const categories = ["ALL", "LES", "TV", "PERFORMANSE", "ART"]

export const Gallery = ({ onSelectSlide }: GalleryProps) => {
  const [selectedCategory, setSelectedCategory] = useState("ALL")

  const filteredSlides =
    selectedCategory === "ALL"
      ? slides
      : slides.filter((slide) => slide.category === selectedCategory)

  return (
    <section className={styles.gallerySection}>
      <div className={styles.header}>
        <h2 className={styles.title}>Featured Projects</h2>
        <nav className={styles.categories}>
          {categories.map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? styles.active : ""}
              onClick={() => setSelectedCategory(category)}
              aria-pressed={selectedCategory === category}
              aria-label={`Фильтровать по категории ${category}`}
            >
              {category}
            </button>
          ))}
        </nav>
      </div>

      <div className={styles.grid}>
        <AnimatePresence mode="wait">
          {filteredSlides.map((slide, index) => (
            <motion.div
              key={slide.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <GalleryItem slide={slide} onClick={() => onSelectSlide(index)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}
