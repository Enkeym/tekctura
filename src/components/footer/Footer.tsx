"use client"

import { CiInstagram, CiMail } from "react-icons/ci"
import { PiTelegramLogoLight } from "react-icons/pi"
import { About } from "../about/About"
import { Contact } from "../contact/Contact"
import styles from "./Footer.module.scss"

export const Footer = () => {
  return (
    <footer
      className={styles.footer}
      aria-label="Контактная информация и ссылки"
    >
      {/* Горизонтальный блок: соцсети + About */}
      <div className={styles.topRow}>
        <section className={styles.center}>
          <About />
        </section>
      </div>

      <nav className={styles.left} aria-label="Социальные сети">
        <ul className={styles.socialList}>
          <li>
            <a
              className={styles.icon}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <CiInstagram />
            </a>
          </li>
          <li>
            <a
              className={styles.icon}
              href="mailto:example@mail.com"
              aria-label="Отправить письмо на email"
            >
              <CiMail />
            </a>
          </li>
          <li>
            <a
              className={styles.icon}
              href="https://t.me/username"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
            >
              <PiTelegramLogoLight />
            </a>
          </li>
        </ul>
      </nav>

      {/* Только на десктопе — доп. информация */}
      {/* <section
        className={`${styles.center} ${styles.hideOnMobile}`}
        aria-label="Информация о студии"
      >
        <WhoAreWe />
      </section>  */}

      <div className={styles.contactWrapper}>
        <Contact />
      </div>
    </footer>
  )
}
