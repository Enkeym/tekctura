"use client"

import Image from "next/image"
import { memo } from "react"
import { ClientOnly } from "./ClientOnly"

interface MediaRendererProps {
  src: string
  alt: string
  kind: "image" | "animation"
  className?: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
}

export const MediaRenderer = memo(
  ({
    src,
    alt,
    kind,
    className,
    width,
    height,
    fill = false,
    priority = false
  }: MediaRendererProps) => {
    if (kind === "animation") {
      return (
        <ClientOnly>
          <video
            src={src}
            controls={false}
            disablePictureInPicture
            controlsList="nodownload noplaybackrate nofullscreen"
            autoPlay
            muted
            loop
            playsInline
            width={!fill ? width ?? 800 : undefined}
            height={!fill ? height ?? 450 : undefined}
            preload="metadata"
            aria-label={alt}
            className={className}
          />
        </ClientOnly>
      )
    }

    return (
      <Image
        src={src}
        alt={alt}
        className={className}
        width={!fill ? width ?? 800 : undefined}
        height={!fill ? height ?? 450 : undefined}
        fill={fill}
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    )
  }
)
