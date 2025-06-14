import { useState } from "react"
import { slides } from "../gallery/data"
import { Gallery } from "../gallery/Gallery"
import { SingleSlide } from "../slider/singleSlide/SingleSlide"
import WrapperModal from "../ui/modal/wrapperModal/WrapperModal"
import { Ticker } from "./Ticker"

export const TickerWrapper = () => {
  const [open, setOpen] = useState<boolean>(false)
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
      <div
        onClick={() => setOpen(true)}
        role="button"
        aria-label="Открыть галерею проектов"
      >
        <Ticker />
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
