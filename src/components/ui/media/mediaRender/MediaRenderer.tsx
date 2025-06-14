"use client"

import Image from "next/image"
import { memo } from "react"
import { ClientOnly } from "./ClientOnly"
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
    return (
      <div className={`${styles.wrapper} ${className ?? ""}`}>
        {kind === "animation" ? (
          <ClientOnly>
            <video
              src={src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={alt}
              className={styles.media}
              controls={false}
              disablePictureInPicture
              controlsList="nodownload noplaybackrate nofullscreen"
            />
          </ClientOnly>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            className={styles.media}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          />
        )}
      </div>
    )
  }
)
