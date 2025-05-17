"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect } from "react"
import { IoClose } from "react-icons/io5"
import styles from "./WrapperModal.module.scss"

interface ModalWrapperProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const WrapperModal = ({ children, isOpen, onClose }: ModalWrapperProps) => {
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
          className={styles.overlay}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
          >
            <button
              className={styles.close}
              onClick={onClose}
              aria-label="Закрыть"
            >
              <IoClose />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WrapperModal
