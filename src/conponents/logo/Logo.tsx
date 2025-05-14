"use client"

import { AnimationControls, motion, useAnimation } from "framer-motion"
import { useEffect, useState } from "react"
import styles from "./logo.module.scss"

export const Logo = () => {
  const controlsR = useAnimation()
  const controlsG = useAnimation()
  const controlsB = useAnimation()
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (hovered) {
      controlsR.start({
        x: [0, -2, 2, -1, 1, 0],
        y: [0, 1, -1, 2, -2, 0],
        transition: { duration: 0.4, repeat: Infinity, ease: "linear" }
      })
      controlsG.start({
        x: [0, 2, -2, 1, -1, 0],
        y: [0, -1, 2, -2, 1, 0],
        transition: { duration: 0.4, repeat: Infinity, ease: "linear" }
      })
      controlsB.start({
        x: [0, 1, -1, 2, -2, 0],
        y: [0, 2, -2, 1, -1, 0],
        transition: { duration: 0.4, repeat: Infinity, ease: "linear" }
      })
    } else {
      controlsR.stop()
      controlsG.stop()
      controlsB.stop()
    }
  }, [controlsB, controlsG, controlsR, hovered])

  const d1 = `M142 80.7v71.8l-36.8-36.8L68.5 79 57.7 89.7 47 100.5l36.7 36.7 36.8 36.8H60v31l30.4.2 30.4.3-54.4 56L12 317.4l10.2 10.3C27.9 333.4 33 338 33.6 338c1 0 93.8-94.5 104.2-106.1l3.7-4.1.5 50.4.5 50.3 15.3.3 15.2.3v-50.6c0-27.8.3-50.5.7-50.5.5 0 12.6 11.8 27 26.2l26.3 26.3 10.7-10.8 10.8-10.7-27-27-27-27H296v-31l-50.6-.2-50.5-.3 21.5-22.1 21.5-22.1-11-10.9-10.9-10.8-21.4 21.9-21.5 22V80.2L173 9h-31v71.7zM755 175.2v102.3l22 .3 22.1.2 22.4-15.5c12.3-8.5 22.7-15.5 23.1-15.5.3 0 10 6.5 21.5 14.5 11.5 7.9 21.8 14.9 22.9 15.5 1.2.7 12.3.9 30.7.8l28.8-.3-13-9.1c-7.2-4.9-23.7-16.4-36.7-25.3-13.1-9-23.8-16.6-23.8-17 .1-.3 16.1-11.6 35.6-25.1 19.6-13.5 35.9-25 36.4-25.5.6-.7-9.1-.9-28.6-.7l-29.5.3-9.7 6.8c-21.3 14.9-81.4 56.1-81.8 56.1-.2 0-.5-14.2-.6-31.5l-.3-31.6-20.8-.2c-11.4-.1-20.7.1-20.7.5z`

  const d2 = `m1056.5 175-79 .5-6.6 2.8c-12.9 5.5-24.4 17.5-28.9 30.2-3.1 8.6-3.7 21.5-1.5 30.3 4.7 19.2 22.4 35.3 42 38.2 4.5.7 33.5.9 80.5.8l73.5-.3.3-16.8.2-16.7H995.4l-4.4-2.3c-12.9-6.5-13.2-24.5-.5-31.1 3.9-2.1 5.2-2.1 75.3-2.4l71.2-.2v-16.5c0-9-.3-16.5-.7-16.7-.5-.2-36.3-.1-79.8.2zM1367 175.1c0 .4 12.3 10.3 27.3 22 14.9 11.7 32.5 25.5 39 30.6l11.7 9.4-24.9 19.7c-13.8 10.8-25 20-25 20.4-.1.5 11.7.8 26.2.8 23.1 0 26.6-.2 28.7-1.7 1.4-.9 8.8-6.7 16.5-12.8 7.7-6.1 35.9-28.4 62.8-49.5 26.8-21.1 48.7-38.6 48.7-38.9 0-.3-12-.5-26.6-.3l-26.5.3-26 20.4c-14.2 11.3-26.2 20.5-26.5 20.5-.3 0-12.1-9.1-26.2-20.3l-25.7-20.2-26.7-.5c-14.8-.3-26.8-.2-26.8.1zM1589.4 175.5c-.2.5-.3 23.7-.2 51.5l.3 50.5h42l.3-10.7.3-10.7 64.2-.3c64.1-.3 64.2-.3 69.7-2.6 12-4.9 20.2-13.8 24-26.1 5.2-16.7-1.4-36.3-15.3-45.3-10.4-6.8-2.9-6.3-98.1-6.8-57.4-.3-87-.2-87.2.5zm155 30.6c1.4.7 3.3 2.8 4.2 4.7 1.4 2.9 1.4 4.1.5 7.3-2.1 7.1-.3 6.9-62.1 6.9h-55v-20h55c38.9 0 55.6.3 57.4 1.1zM1810.6 225.3c-22.6 27.9-41.2 51.2-41.4 51.7-.2.6 8.1 1 22.6 1h22.9l6.3-8 6.3-8h101.5l6.3 8 6.3 8h22.8c12.5 0 22.8-.3 22.8-.8 0-.4-18.6-23.6-41.3-51.5l-41.2-50.8-26.4-.2-26.4-.2-41.1 50.8zm82.8-6.8c8 9.9 14.6 18.3 14.6 18.7 0 .5-13.5.8-30.1.8-19.2 0-29.9-.4-29.7-1 .6-1.7 29.3-36.9 30-36.7.3.1 7.2 8.3 15.2 18.2zM323 190v15h80l.2 36.2.3 36.3 21.3.3 21.2.2v-73h80v-30H323v15zM541.2 226.2l.3 51.3 98.8.3 98.7.2v-29H584v-10h155v-26H584v-10h155v-28H541l.2 51.2zM1149.2 189.7l.3 14.8 39.7.3 39.8.2.2 36.3.3 36.2 21.3.3 21.2.2v-73h80v-30h-203.1l.3 14.7z`

  const renderLayer = (color: string, controls: AnimationControls) => (
    <>
      <motion.path
        d={d1}
        animate={controls}
        style={{ fill: color, mixBlendMode: "screen" }}
      />
      <motion.path
        d={d2}
        animate={controls}
        style={{ fill: color, mixBlendMode: "screen" }}
      />
    </>
  )

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2000 440"
      className={styles.logoSvg}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {renderLayer("red", controlsR)}
      {renderLayer("lime", controlsG)}
      {renderLayer("blue", controlsB)}
    </svg>
  )
}
