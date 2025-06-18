import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { ButtonCLose } from "../../button/buttonClose/ButtonCLose"
import styles from "./GalleryModal.module.scss"

interface GalleryModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const GalleryModal = ({
  children,
  isOpen,
  onClose
}: GalleryModalProps) => {
  const backdropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          ref={backdropRef}
          onClick={(e) => {
            if (e.target === backdropRef.current) onClose()
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
        >
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ButtonCLose onClose={onClose} />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
