"use client"

import { WhoAreWe } from "@/components/whoAreWe/WhoAreWe"
import { CiInstagram, CiMail } from "react-icons/ci"
import { PiTelegramLogoLight } from "react-icons/pi"
import { About } from "../about/About"
import styles from "./Footer.module.scss"
import { Contact } from "../contact/Contact"

export const Footer = () => {
  return (
    <footer
      className={styles.footer}
      aria-label="Контактная информация и ссылки"
    >
      {/* Горизонтальный блок: соцсети + About */}
      <div className={styles.topRow}>
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

        <section className={styles.center}>
          <About />
        </section>
      </div>

      <div className={styles.contactWrapper}>
        <Contact />
      </div>

      {/* Только на десктопе — доп. информация */}
      <section
        className={`${styles.center} ${styles.hideOnMobile}`}
        aria-label="Информация о студии"
      >
        <WhoAreWe />
      </section>
    </footer>
  )
}
