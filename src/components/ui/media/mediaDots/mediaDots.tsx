

interface MediaDotsProps {
  activeIndex: number
  total: number
}

export const MediaDots = ({ activeIndex, total }: MediaDotsProps) => {
  return (
    <div
      className="pointer-events-none absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 gap-2 max-[480px]:bottom-2 max-[480px]:gap-1.5"
      role="tablist"
      aria-label={`Просмотр медиа: ${activeIndex + 1} из ${total}`}
    >
      {Array.from({ length: total }).map((_, index) => (
        <span
          key={index}
          className={`h-2 w-2 rounded-full bg-white/40 transition-colors ${index === activeIndex ? 'bg-white' : ''}`}
          role="tab"
          aria-selected={index === activeIndex}
          aria-label={`Медиа ${index + 1}`}
        />
      ))}
    </div>
  )
}
