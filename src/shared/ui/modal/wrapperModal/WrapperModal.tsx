"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect } from "react"
import { IoClose } from "react-icons/io5"


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
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/65 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative m-4 flex max-h-[90vh] w-full max-w-[35rem] flex-col gap-6 overflow-y-auto overflow-x-hidden rounded-lg bg-[#111] p-0 text-white shadow-[0_1.875rem_5rem_rgba(0,0,0,0.6)]"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <button
              className="absolute right-4 top-4 flex min-h-10 min-w-10 items-center justify-center text-2xl text-white transition-opacity hover:opacity-60"
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
