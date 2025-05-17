import { Logo } from "../logo/Logo"
import { Ticker } from "../ticker/Ticker"
import styles from "./Header.module.scss"

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.tickerWrapper}>
        <Ticker />
      </div>
    </header>
  )
}
