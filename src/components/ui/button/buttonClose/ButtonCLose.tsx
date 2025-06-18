import { IoClose } from "react-icons/io5"
import styles from "./ButtonCLose.module.scss"

export const ButtonCLose = ({ onClose }: { onClose: () => void }) => {
  return (
    <button className={styles.close} onClick={onClose} aria-label="Закрыть">
      <IoClose />
    </button>
  )
}
