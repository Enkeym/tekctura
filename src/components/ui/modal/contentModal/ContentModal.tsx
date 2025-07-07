import styles from "./ContentModal.module.scss"

interface ContentModalProps {
  title?: string
  children: React.ReactNode
}

export const ContentModal = ({ title, children }: ContentModalProps) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.body}>{children}</div>
    </div>
  )
}
