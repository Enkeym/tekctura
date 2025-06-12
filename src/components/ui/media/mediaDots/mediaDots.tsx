import styles from "./MediaDots.module.scss"

interface MediaDotsProps {
  activeIndex: number
  total: number
}

export const MediaDots = ({ activeIndex, total }: MediaDotsProps) => {
  return (
    <div
      className={styles.dots}
      role="tablist"
      aria-label={`Просмотр медиа: ${activeIndex + 1} из ${total}`}
    >
      {Array.from({ length: total }).map((_, index) => (
        <span
          key={index}
          className={`${styles.dot} ${
            index === activeIndex ? styles.active : ""
          }`}
          role="tab"
          aria-selected={index === activeIndex}
          aria-label={`Медиа ${index + 1}`}
        />
      ))}
    </div>
  )
}
