import { slides } from "./data"

import { GalleryItem } from "./galleryItem/GalleryItem"

interface GalleryProps {
  onSelectSlide: (index: number) => void
}

export const Gallery = ({ onSelectSlide }: GalleryProps) => (
  <section className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-2 overflow-hidden md:overflow-auto">
    {slides.map((slide, index) => (
      <GalleryItem
        key={slide.title}
        slide={slide}
        onClick={() => onSelectSlide(index)}
      />
    ))}
  </section>
)
