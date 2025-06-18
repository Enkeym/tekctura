// galleryItem/GalleryItem.tsx
import { MediaRenderer } from "@/components/ui/media/mediaRender/MediaRenderer"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Slide } from "../types/slide"


interface Props {
  slide: Slide
  onClick?: () => void
}

export const GalleryItem = ({ slide, onClick }: Props) => {
  const preview = slide.media[0]

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "100px"
  })

  return (
    <motion.article
      ref={ref}
      className="flex cursor-pointer flex-col overflow-hidden rounded-xl bg-[#111] transition-transform duration-200 hover:scale-105"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Открыть слайд: ${slide.title}`}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative h-full w-full">
        <MediaRenderer
          src={preview.src}
          alt={slide.title}
          kind={preview.kind}
          className="h-full w-full object-cover"
        />
        <h3 className="absolute left-4 right-4 top-4 max-w-[90%] break-words text-lg font-medium text-white drop-shadow-md">
          {slide.title.toUpperCase()}
        </h3>
      </div>
    </motion.article>
  )
}
