"use client"

import { useEffect, useRef, useState } from "react"
import { FiMaximize, FiMinimize } from "react-icons/fi"
import { IoPlay } from "react-icons/io5"
import { useInView } from "react-intersection-observer"

interface Props {
  src: string
  alt: string
  aspectRatio?: string
  poster?: string
}

export const CustomVideoPlayer = ({
  src,
  alt,
  aspectRatio = "16 / 9",
  poster
}: Props) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px"
  })

  const setRefs = (el: HTMLDivElement) => {
    inViewRef(el)
    containerRef.current = el
  }

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (video.ended) {
      video.currentTime = 0
    }

    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const toggleFullscreen = () => {
    const container = containerRef.current
    if (!container) return

    if (!document.fullscreenElement) {
      container.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
  }

  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (!video) return
    setCurrentTime(video.currentTime)
  }

  const handleLoadedMetadata = () => {
    const video = videoRef.current
    if (!video) return
    setDuration(video.duration)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const video = videoRef.current
    if (video && duration) {
      video.currentTime = percent * duration
      setCurrentTime(video.currentTime)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault()
        togglePlay()
      }
    }
    window.addEventListener("keydown", keyHandler)
    return () => window.removeEventListener("keydown", keyHandler)
  }, [])

  const formatTime = (sec: number) => {
    const minutes = Math.floor(sec / 60)
    const seconds = Math.floor(sec % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div
      ref={setRefs}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio,
        overflow: "hidden",
        borderRadius: "0.75rem",
        background: "#000"
      }}
    >
      {inView && (
        <>
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            preload="metadata"
            disablePictureInPicture
            controlsList="nodownload nofullscreen noplaybackrate"
            onClick={togglePlay}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              top: 0,
              left: 0,
              borderRadius: "inherit",
              cursor: "pointer"
            }}
            aria-label={alt}
          />

          {!isPlaying && (
            <button
              onClick={togglePlay}
              aria-label="Воспроизвести"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "rgba(0,0,0,0.6)",
                border: "none",
                borderRadius: "50%",
                width: "64px",
                height: "64px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "white",
                fontSize: "28px",
                zIndex: 2
              }}
            >
              <IoPlay />
            </button>
          )}

          <div
            onClick={handleProgressClick}
            aria-label="Перемотка видео"
            role="slider"
            style={{
              position: "absolute",
              bottom: 8,
              left: 8,
              right: 8,
              height: 8,
              background: "rgba(255,255,255,0.2)",
              borderRadius: 4,
              cursor: "pointer",
              zIndex: 2
            }}
          >
            <div
              style={{
                width: `${(currentTime / duration) * 100 || 0}%`,
                height: "100%",
                background: "#fff",
                borderRadius: 4
              }}
            />
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 20,
              right: 12,
              fontSize: "12px",
              color: "#ccc",
              fontFamily: "monospace",
              background: "rgba(0, 0, 0, 0.5)",
              padding: "2px 6px",
              borderRadius: "4px",
              zIndex: 2
            }}
            aria-hidden="true"
          >
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>

          <button
            onClick={toggleFullscreen}
            aria-label={
              isFullscreen ? "Выйти из полноэкранного режима" : "Во весь экран"
            }
            style={{
              position: "absolute",
              bottom: 20,
              left: 12,
              fontSize: "18px",
              color: "#fff",
              background: "rgba(0, 0, 0, 0.5)",
              padding: "4px 8px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {isFullscreen ? <FiMinimize /> : <FiMaximize />}
          </button>
        </>
      )}
    </div>
  )
}
