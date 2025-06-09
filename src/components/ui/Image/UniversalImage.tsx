"use client"

import Image from "next/image"

interface UniversalImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  fill?: boolean
  width?: number
  height?: number
}

/**
 * Универсальный компонент для статичных и анимированных изображений.
 * Отключает оптимизацию для animated .webp/.gif, чтобы избежать потерь.
 */
export const UniversalImage = ({
  src,
  alt,
  className,
  priority = false,
  fill = false,
  width,
  height
}: UniversalImageProps) => {
  const isAnimated = src.endsWith(".webp") || src.endsWith(".gif")

  return (
    <Image
      src={src}
      alt={alt}
      width={!fill ? width ?? 800 : undefined}
      height={!fill ? height ?? 450 : undefined}
      loading={priority ? "eager" : "lazy"}
      priority={priority}
      fill={fill}
      sizes="(max-width: 768px) 100vw, 50vw"
      unoptimized={isAnimated}
      className={className}
    />
  )
}
