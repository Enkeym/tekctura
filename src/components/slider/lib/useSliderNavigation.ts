import { useCallback, useRef, useState } from "react"

export const useSliderNavigation = (length: number) => {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const changeSlide = useCallback(
    (delta: number) => {
      setDirection(delta)
      setActive((prev) => (prev + delta + length) % length)
    },
    [length]
  )

  const throttleSlideChange = useCallback(
    (delta: number) => {
      if (timeoutRef.current) return
      changeSlide(delta)
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null
      }, 1000)
    },
    [changeSlide]
  )

  return {
    active,
    direction,
    throttleSlideChange,
    timeoutRef
  }
}
