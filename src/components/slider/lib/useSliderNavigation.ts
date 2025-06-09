import { useCallback, useEffect, useRef, useState } from "react"

type Params = {
  length: number
  containerRef: React.RefObject<HTMLElement | null>
}

export const useSliderNavigation = ({ length, containerRef }: Params) => {
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

  useEffect(() => {
    if (!containerRef?.current) return

    const el = containerRef.current
    const startX = { current: 0 }

    const onWheel = (e: WheelEvent) => {
      if (!el.contains(e.target as Node)) return
      throttleSlideChange(e.deltaY > 0 ? 1 : -1)
    }

    const onTouchStart = (e: TouchEvent) => {
      startX.current = e.touches[0].clientX
    }

    const onTouchEnd = (e: TouchEvent) => {
      const deltaX = e.changedTouches[0].clientX - startX.current
      if (Math.abs(deltaX) > 50) {
        throttleSlideChange(deltaX < 0 ? 1 : -1)
      }
    }

    el.addEventListener("wheel", onWheel, { passive: true })
    el.addEventListener("touchstart", onTouchStart)
    el.addEventListener("touchend", onTouchEnd)

    return () => {
      el.removeEventListener("wheel", onWheel)
      el.removeEventListener("touchstart", onTouchStart)
      el.removeEventListener("touchend", onTouchEnd)
    }
  }, [containerRef, throttleSlideChange])

  return {
    active,
    direction,
    throttleSlideChange,
    timeoutRef
  }
}
