import { useCallback, useEffect, useRef, useState } from "react"

type Params = {
  length: number
  containerRef: React.RefObject<HTMLElement | null>
  swipeThreshold?: number
  throttleMs?: number
}

export const useSliderNavigation = ({
  length,
  containerRef,
  swipeThreshold = 50,
  throttleMs = 1000
}: Params) => {
  const [active, setActive] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const touchStartX = useRef(0)

  const changeSlide = useCallback(
    (delta: number) => {
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
      }, throttleMs)
    },
    [changeSlide, throttleMs]
  )

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      if (!el.contains(e.target as Node)) return
      throttleSlideChange(e.deltaY > 0 ? 1 : -1)
    }

    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX
    }

    const onTouchEnd = (e: TouchEvent) => {
      const deltaX = e.changedTouches[0].clientX - touchStartX.current
      if (Math.abs(deltaX) > swipeThreshold) {
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
  }, [containerRef, swipeThreshold, throttleSlideChange])

  return {
    active
  }
}
