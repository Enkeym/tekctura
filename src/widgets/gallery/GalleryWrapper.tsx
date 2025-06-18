"use client"

import { useState } from 'react'
import { Gallery } from '@/features/gallery/ui/Gallery'
import { SingleSlide } from '@/components/slider/singleSlide/SingleSlide'
import WrapperModal from '@/shared/ui/modal/wrapperModal/WrapperModal'
import { slides } from '@/entities/gallery/slides'

interface GalleryWrapperProps {
  trigger: React.ReactNode
}

export const GalleryWrapper = ({ trigger }: GalleryWrapperProps) => {
  const [open, setOpen] = useState(false)
  const [activeSlide, setActiveSlide] = useState<number | null>(null)

  const handleClose = () => {
    if (activeSlide !== null) {
      setActiveSlide(null)
    } else {
      setOpen(false)
    }
  }

  return (
    <>
      <div onClick={() => setOpen(true)} role="button" aria-label="Открыть галерею проектов">
        {trigger}
      </div>
      <WrapperModal isOpen={open} onClose={handleClose}>
        {activeSlide === null ? (
          <Gallery onSelectSlide={(index) => setActiveSlide(index)} />
        ) : (
          <SingleSlide slide={slides[activeSlide]} />
        )}
      </WrapperModal>
    </>
  )
}
