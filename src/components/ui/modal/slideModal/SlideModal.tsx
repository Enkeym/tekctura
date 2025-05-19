"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { IoClose } from "react-icons/io5"
import styles from "./SlideModal.module.scss"

interface MediaItem {
  type: "image" | "gif"
  src: string
}

interface SlideModal {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  media: MediaItem[]
}

export const SlideModal = ({
  isOpen,
  onClose,
  title,
  description,
  media
}: SlideModal) => {
  const [descExpanded, setDescExpanded] = useState(false)
  const [imgExpanded, setImgExpanded] = useState<null | number>(null)

  const images = media.filter((m) => m.type === "image" || m.type === "gif")
  const leftImage = images[0]
  const rightImages = images.slice(1)

  const getHeightClass = (count: number) => {
    if (count === 1) return styles.full
    if (count === 2) return styles.half
    return styles.dynamic
  }

  const handleImageToggle = (idx: number) => {
    setImgExpanded((prev) => (prev === idx ? null : idx))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <button className={styles.close} onClick={onClose}>
              <IoClose size={24} />
            </button>

            <div className={styles.header}>
              <h2>{title}</h2>
            </div>

            <div className={styles.content}>
              {/* ЛЕВАЯ часть (первое изображение) */}
              {leftImage && (
                <div className={styles.left}>
                  <img
                    src={leftImage.src}
                    className={styles.media}
                    alt="main-preview"
                  />
                </div>
              )}

              {/* ПРАВАЯ часть (оставшиеся изображения) */}
              {rightImages.length > 0 && (
                <div className={styles.right}>
                  {rightImages.map((img, i) => (
                    <motion.div
                      key={i}
                      className={`${styles.imageWrapper} ${getHeightClass(
                        rightImages.length
                      )} ${imgExpanded === i ? styles.expanded : ""}`}
                      onClick={() => handleImageToggle(i)}
                      animate={{
                        height: imgExpanded === i ? "80vh" : undefined
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <img
                        src={img.src}
                        alt={`media-${i}`}
                        className={styles.image}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <motion.div
              className={styles.description}
              onClick={() => setDescExpanded((prev) => !prev)}
              animate={{ height: descExpanded ? "60vh" : "100px" }}
              transition={{ duration: 0.4 }}
            >
              <div className={styles.scrollable}>
                <p>{description}</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
