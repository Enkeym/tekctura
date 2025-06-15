"use client"

import Image from "next/image"
import { memo } from "react"
import { useInView } from "react-intersection-observer"
import styles from "./MediaRenderer.module.scss"

interface MediaRendererProps {
  src: string
  alt: string
  kind: "image" | "animation"
  className?: string
  priority?: boolean
}

export const MediaRenderer = memo(
  ({ src, alt, kind, className, priority = false }: MediaRendererProps) => {
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.1,
      rootMargin: "100px"
    })

    const wrapperClass = `${styles.wrapper} ${className ?? ""}`

    if (kind === "animation") {
      return (
        <div ref={ref} className={wrapperClass}>
          {inView && (
            <video
              src={src}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              aria-label={alt}
              className={styles.media}
              controls={false}
              disablePictureInPicture
              controlsList="nodownload noplaybackrate nofullscreen"
            />
          )}
        </div>
      )
    }

    return (
      <div className={wrapperClass}>
        <Image
          src={src}
          alt={alt}
          fill
          className={styles.media}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
        />
      </div>
    )
  }
)
