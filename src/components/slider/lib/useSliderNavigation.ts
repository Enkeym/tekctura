import { useCallback, useEffect, useRef, useState } from "react"

type Params = {
  length: number
  containerRef: React.RefObject<HTMLElement | null>
  swipeThreshold?: number
  throttleMs?: number
}

const isScrollable = (node: EventTarget | null): boolean => {
  if (!(node instanceof HTMLElement)) return false
  const { scrollHeight, clientHeight } = node
  return scrollHeight > clientHeight
}

const isInsideScrollableArea = (
  node: EventTarget | null,
  boundary: HTMLElement | null
): boolean => {
  let current = node as HTMLElement | null
  while (current && current !== boundary) {
    if (isScrollable(current)) return true
    current = current.parentElement
  }
  return false
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
  const touchStartY = useRef(0)
  const touchMoveX = useRef(0)
  const touchMoveY = useRef(0)

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
      if (isInsideScrollableArea(e.target, el)) return
      throttleSlideChange(e.deltaY > 0 ? 1 : -1)
    }

    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
    }

    const onTouchMove = (e: TouchEvent) => {
      touchMoveX.current = e.touches[0].clientX
      touchMoveY.current = e.touches[0].clientY
    }

    const onTouchEnd = (e: TouchEvent) => {
      const deltaX = touchMoveX.current - touchStartX.current
      const deltaY = touchMoveY.current - touchStartY.current

      // Если пользователь двигал палец больше по Y — это скролл, а не свайп
      if (Math.abs(deltaY) > Math.abs(deltaX)) return

      // Иначе — свайп по X
      if (Math.abs(deltaX) > swipeThreshold) {
        throttleSlideChange(deltaX < 0 ? 1 : -1)
      }
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (isInsideScrollableArea(e.target, el)) return
      if (e.key === "ArrowRight") throttleSlideChange(1)
      if (e.key === "ArrowLeft") throttleSlideChange(-1)
    }

    el.addEventListener("wheel", onWheel, { passive: true })
    el.addEventListener("touchstart", onTouchStart, { passive: true })
    el.addEventListener("touchmove", onTouchMove, { passive: true })
    el.addEventListener("touchend", onTouchEnd)
    el.addEventListener("keydown", onKeyDown)

    return () => {
      el.removeEventListener("wheel", onWheel)
      el.removeEventListener("touchstart", onTouchStart)
      el.removeEventListener("touchmove", onTouchMove)
      el.removeEventListener("touchend", onTouchEnd)
      el.removeEventListener("keydown", onKeyDown)
    }
  }, [containerRef, swipeThreshold, throttleSlideChange])

  return {
    active
  }
}
