"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { ButtonCLose } from "../../button/buttonClose/ButtonCLose"
import styles from "./WrapperModal.module.scss"

interface ModalWrapperProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const WrapperModal = ({ children, isOpen, onClose }: ModalWrapperProps) => {
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
          className={styles.overlay}
          ref={backdropRef}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <ButtonCLose onClose={onClose} />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WrapperModal
