"use client"

import { Logo } from "../logo/Logo"
import { Ticker } from "../ticker/Ticker"
import styles from "./Header.module.scss"

export const Header = () => {
  return (
    <header className={styles.header} role="banner" aria-label="Шапка сайта">
      <div className={styles.logo} aria-label="Логотип студии" role="img">
        <Logo />
      </div>

      <div className={styles.tickerWrapper} aria-hidden="true">
        <Ticker />
      </div>
    </header>
  )
}
